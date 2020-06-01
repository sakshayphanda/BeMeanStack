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
    this.store.dispatch(new CreatePostApi({
      text: this.postText,
      user: this.authService.userDetails
    }));

  }

}
