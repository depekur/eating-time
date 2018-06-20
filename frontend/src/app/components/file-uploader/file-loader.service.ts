import {Injectable} from '@angular/core';
import {File} from "./File.model";

import {Observable} from "rxjs/Rx";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {apiUrls} from "../../app-config";

@Injectable()
export class FileLoaderService {

  constructor(private httpClient: HttpClient) {
  }

  load(file: File): Observable<any> {
    let formData = new FormData();

    formData.append('photo', file.nativeFile);

    // console.log('file', file);
    // console.log('nativeFile', file.nativeFile);

    const req = new HttpRequest('POST', apiUrls.file.upload, formData, {
      reportProgress: true,
    });

    return this.httpClient.request(req);
  }

  delete(fileId): Observable<any> {
    return this.httpClient.delete(`${apiUrls.file.delete}${fileId}`);
  }
}
