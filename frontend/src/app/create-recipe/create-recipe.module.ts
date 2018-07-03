import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeComponent } from './create-recipe.component';
import { RouterModule, Routes} from "@angular/router";
import { SharedModule } from '../shared/shared.module';
import { FileUploaderModule } from "../components/file-uploader/file-uploader.module";
import { JwtInterceptor } from "../jwt.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthGuard} from "../shared/guards/auth.guard";

const routes:Routes = [
  {
    path: '', component: CreateRecipeComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FileUploaderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateRecipeComponent],
  providers: [
    AuthGuard
  ]
})
export class CreateRecipeModule { }
