import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [ProfileComponent, PostComponent, UserComponent],
  imports: [CommonModule, RouterModule],
  exports: [ProfileComponent, PostComponent, UserComponent]
})
export class SharedModule { }
