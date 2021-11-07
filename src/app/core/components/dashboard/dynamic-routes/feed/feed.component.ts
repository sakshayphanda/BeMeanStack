import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import {
  CreatePostApi,
  DeletePostApi,
  ListAllPostsApi,
} from 'src/app/store/actions/posts/posts.actions';
import { AppState } from 'src/app/store/reducers';
import { posts } from 'src/app/store/selectors/post.selector';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  postText: string = '';
  posts;
  imagePreview: string | ArrayBuffer;
  imgFile: File;
  loading: boolean = false;
  constructor(
    private store: Store<AppState>,
    public authService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
  ) {}

  /**
   * life cycle hook
   */
  ngOnInit(): void {
    this.store.dispatch(new ListAllPostsApi(this.authService.userDetails));
    this.store
      .select(posts)
      .pipe(
        tap((post) => {
          this.posts = post;
          this.loading = false;
        })
      )
      .subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });
  }

  postCreate() {
    if (this.imgFile || this.postText) {
      this.loading = true;
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const time =
        hours > 12
          ? hours - 12 + ':' + minutes + ' PM'
          : hours + ':' + minutes + ' AM';
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const currentDateAndTime: string = `${date.getDate()} ${
        monthNames[date.getMonth()]
      } at ${time}`;
      const postData: FormData = new FormData();
      postData.append('text', this.postText);
      postData.append('image', this.imgFile);
      postData.append('date', currentDateAndTime);
      postData.append('user', this.authService.userDetails._id);
      this.store.dispatch(new CreatePostApi(postData));
      this.postText = '';
      this.imgFile = null;
      this.imagePreview = null;
    }
  }

  imageFile(event: Event): void {
    this.imgFile = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.changeDetectorRef.markForCheck();
    };
    reader.readAsDataURL(this.imgFile);
  }

  getImage(buffer, post): SafeUrl {
    // const TYPED_ARRAY = new Uint8Array(buffer);
    const STRING_CHAR: string = buffer.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');
    const base64String: string = btoa(STRING_CHAR);
    const safeImageUrl: SafeUrl = this.domSanitizer.bypassSecurityTrustUrl(
      'data:image/png;base64, ' + base64String
    );
    return safeImageUrl;
  }

  deletePost(id, i) {
    this.loading = true;
    this.store.dispatch(
      new DeletePostApi({
        postId: id,
        userId: this.authService.userDetails._id,
        index: i,
      })
    );
  }
}
