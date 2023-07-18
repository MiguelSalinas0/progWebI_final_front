import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent, PostComponent, UserComponent],
  imports: [CommonModule, RouterModule, MatMenuModule, MatIconModule, MatButtonModule, FormsModule],
  exports: [ProfileComponent, PostComponent, UserComponent]
})
export class SharedModule { }
