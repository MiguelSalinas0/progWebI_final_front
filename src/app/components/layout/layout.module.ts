import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RoutesModule } from '../routes/routes.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, RoutesModule, AppRoutingModule, RouterModule],
  exports: [HeaderComponent, FooterComponent]
})
export class LayoutModule { }
