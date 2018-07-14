import {Component, Input, Output, EventEmitter, OnInit, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {HttpEventType, HttpResponse} from "@angular/common/http";

import {FileLoaderService} from "./file-loader.service";
import {File} from './File.model';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    }
  ]
})
export class FileUploaderComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() disabled = false;

  @Input() formats?: Array<string> = [
    'jpg', 'jpeg', 'png', 'bmp', 'gif'
  ];
  @Input() maxFilesCount?: number = 1;
  @Input() maxFileSizeMb?: number = 25;
  @Input() isMultiple?: boolean = false;
  @Output() isFileProcessing: EventEmitter<boolean> = new EventEmitter();

  @Input() showPic: boolean = false;

  @Input() id: string;
  fileInputEl: any;

  files: Array<File> = [];

  maxFileSize: number;
  ERRORS: any;
  isOverDropZone: boolean = false;

  fileError: string;

  previewUrl: any[] = [];


  constructor(private fileLoader: FileLoaderService) {
  }

  ngAfterViewInit() {
    this.fileInputEl = document.getElementById(this.id);
  }

  ngOnInit() {
    this.maxFileSize = this.maxFileSizeMb * 1024 * 1024;

    this.ERRORS = {
      TO_SMALL: "Файл слишком маленький",
      TO_LARGE: `Размер файла не должен превышать ${this.maxFileSizeMb}Mb.`,
      FORMAT: `Вы можете загрузить только файлы формата: ${this.formats.join(', ')}`,
      MAX_COUNT: `Вы не можете загрузить больше  ${this.maxFilesCount} files.`,
      SAME: "Этот файл уже загружен"
    };

    /**
     * fix for some browsers that will open dropped file, if they can open it
     * e.g. images, pdf etc.
     *
     * more details ->
     * https://stackoverflow.com/questions/6756583/prevent-browser-from-loading-a-drag-and-dropped-file
     */
    window.addEventListener("dragover", function (e) {
      e.preventDefault();
    }, false);

    window.addEventListener("drop", function (e) {
      e.preventDefault();
    }, false);
  }

  writeValue(files?: Array<File>): void {
    //this.files = files;
    this.propagateChange(files);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  propagateChange(_: any): void {
  }

  propagateTouch(_: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getDroppedFiles($event) {
    let files = $event.dataTransfer.files,
        filesCount = files.length;

    for (let i = 0; i < filesCount; i++) {
      this.loadFile(files[i]);
    }

    this.getDroppedPreview($event);

    this.isOverDropZone = false;

    $event.preventDefault();
    return false;
  }

  getUpload($event) {
    let files = $event.target.files,
      filesCount = files.length;

    this.getInputtedPreview($event);

    for (let i = 0; i < filesCount; i++) {
      this.loadFile(files[i]);
    }
  }

  getDroppedPreview(event:any) {
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.previewUrl.push(event.target.result);
      };

      reader.readAsDataURL(event.dataTransfer.files[0]);
    }
  }

  getInputtedPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.previewUrl.push(event.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteFile(file) {
    let files = this.files,
        filesCount = files.length;

    for (let i = 0; i < filesCount; i++) {
      if (files[i] == file) {
        this.fileInputEl.value = "";
        this.isFileProcessing.emit(true);

        this.fileLoader.delete(file.hash)
          .finally(() => {
            this.isFileProcessing.emit(false);
          })
          .subscribe(
            res => {
              this.files.splice(i, 1);
              this.previewUrl.splice(i, 1);
              this.writeValue(this.files);
            },
            error => console.error(error));
        return;
      }
    }
  }

  loadFile(fileData) {
    let newFile = new File(fileData);

    if (this.checkFile(newFile)) {
      if (!this.files) {
        this.files = [];
      }

      this.files.push(newFile);
      this.isFileProcessing.emit(true);

      // get stored file
      const storedFileIndex = this.files.length - 1;

      this.fileLoader.load(newFile)
        .finally(() => {
          this.isFileProcessing.emit(false);
        })
        .subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              newFile.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              if (event.body['id']) {
                newFile.progress = 100;
                newFile.loadingState = true;
                newFile.hash = event.body['id'];
                this.writeValue(this.files);
              } else {
                this.showFileError("Error while uploading a file");
                this.files.slice(storedFileIndex, 1);
              }
            }
          },
          error => {
            this.showFileError(`Error while uploading file [${fileData.name}]`);
            this.files.splice(storedFileIndex, 1);
          });
    }
  }

  private checkFile(file: File) {
    let type = file.name.split('.').pop();

    if (this.files.length >= this.maxFilesCount) {
      return this.showFileError(this.ERRORS.MAX_COUNT);
    } else if (this.checkSameFile(file)) {
      return this.showFileError(this.ERRORS.SAME);
    } else if (file.size === 0) {
      return this.showFileError(this.ERRORS.TO_SMALL);
    } else if (file.size > this.maxFileSize) {
      return this.showFileError(this.ERRORS.TO_LARGE);
    } else if (this.formats.indexOf(type) == -1) {
      return this.showFileError(this.ERRORS.FORMAT);
    }

    return true;
  }

  private checkSameFile(file: File) {
    const files = this.files,
      filesCount = files.length;

    for (let i = 0; i < filesCount; i++) {
      if (files[i].compare(file)) {
        return true;
      }
    }

    return false;
  }

  private showFileError(text: string): boolean {
    this.fileError = text;

    setTimeout(() => {
      this.fileError = null;
    }, 7000);

    return false;
  }
}
