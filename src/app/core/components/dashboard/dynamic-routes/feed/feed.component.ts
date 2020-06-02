import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { CreatePostApi, ListAllPostsApi } from 'src/app/store/actions/posts/posts.actions';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { posts } from 'src/app/store/selectors/post.selector';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {

  postText: string;
  posts;
  imagePreview: string | ArrayBuffer;
  imgFile: File;
  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new ListAllPostsApi());
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
    this.store.dispatch(new CreatePostApi(postData));

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

}
