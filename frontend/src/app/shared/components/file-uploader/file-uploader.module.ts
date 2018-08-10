import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FileUploaderComponent} from './file-uploader.component';
import {FileLoaderService} from './file-loader.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FileUploaderComponent
  ],
  exports: [
    FileUploaderComponent
  ],
  providers: [
    FileLoaderService
  ]
})
export class FileUploaderModule {
}
