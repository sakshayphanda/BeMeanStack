// News Feed
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
import { getMonthNames } from 'src/app/shared/utils/commonUtils';
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
  posts: any;
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
        tap((post: any) => {
          this.posts = post;
          this.loading = false;
        })
      )
      .subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });
  }

  /**
   * create a post
   */
  postCreate(): void {
    if (this.imgFile || this.postText) {
      this.loading = true;
      const date: Date = new Date();
      const hours: number = date.getHours();
      const minutes: number = date.getMinutes();
      const time: string =
        hours > 12
          ? hours - 12 + ':' + minutes + ' PM'
          : hours + ':' + minutes + ' AM';
      const monthNames: string[] = getMonthNames();
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

  /**
   * image file
   * @param event event
   */
  imageFile(event: Event): void {
    this.imgFile = (event.target as HTMLInputElement).files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (): void => {
      this.imagePreview = reader.result;
      this.changeDetectorRef.markForCheck();
    };
    reader.readAsDataURL(this.imgFile);
  }

  /**
   * get image url
   * @param buffer image buffer array
   * @param post post
   */
  getImage(buffer: [], post?: any): SafeUrl {
    // const TYPED_ARRAY = new Uint8Array(buffer);
    const STRING_CHAR: string = buffer.reduce((acc: string, byte: number) => {
      return acc + String.fromCharCode(byte);
    }, '');
    const base64String: string = btoa(STRING_CHAR);
    const safeImageUrl: SafeUrl = this.domSanitizer.bypassSecurityTrustUrl(
      'data:image/png;base64, ' + base64String
    );
    return safeImageUrl;
  }

  /**
   * Delete a post
   * @param postId  postId
   * @param i index
   */
  deletePost(postId: any, index: number): void {
    this.loading = true;
    this.store.dispatch(
      new DeletePostApi({
        postId,
        userId: this.authService.userDetails._id,
        index,
      })
    );
  }
}
