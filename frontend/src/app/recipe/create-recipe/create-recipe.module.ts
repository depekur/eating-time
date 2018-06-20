import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeComponent } from './create-recipe.component';
import { RouterModule, Routes} from "@angular/router";
import { SharedModule } from '../../shared/shared.module';
import { FileUploaderModule } from "../../components/file-uploader/file-uploader.module";

const routes:Routes = [
  {
    path: '', component: CreateRecipeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FileUploaderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateRecipeComponent]
})
export class CreateRecipeModule { }
