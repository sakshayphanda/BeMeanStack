import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { CreatePostApi, ListAllPostsApi } from 'src/app/store/actions/posts/posts.actions';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { posts } from 'src/app/store/selectors/post.selector';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {

  postText = '';
  posts;
  imagePreview: string | ArrayBuffer;
  imgFile: File;
  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new ListAllPostsApi(this.authService.userDetails));
    this.store.select(posts).subscribe(
      post => {
        this.posts = post;
        console.log(post);
        this.changeDetectorRef.markForCheck();
      }
    );
  }

  postCreate() {
    const postData = new FormData();
    postData.append('text', this.postText);
   // postData.append('user', new Blob([JSON.stringify(this.authService.userDetails)], {type: 'application/json'}));
    postData.append('image', this.imgFile);
    postData.append('user', this.authService.userDetails._id);
    this.store.dispatch(new CreatePostApi(postData));

    this.postText = '';
    this.imgFile = null;
    this.imagePreview = null;

  }

  imageFile(event: Event) {
    this.imgFile = (event.target as HTMLInputElement).files[0];

    console.log(event);
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = reader.result;
        this.changeDetectorRef.markForCheck();
      };
    reader.readAsDataURL(this.imgFile);
  }

  getImage(buffer, post) {
    console.log(post);
    // const TYPED_ARRAY = new Uint8Array(buffer);
    const STRING_CHAR = buffer.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
      }, '');
    const base64String = btoa(STRING_CHAR);
    const image =  this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64String);
    return image;
  }

}
