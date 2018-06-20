<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function upload(Request $request) {
      $this->validate($request, [
        'photo' => 'required|file|mimes:jpg,jpeg,png,bmp,gif',
      ]);

      $file = $request->file('photo');
      $file->storePublicly('images');
     // $fileName = $file->getClientOriginalName();
      $fileName = $file->hashName();


      //$file->store('images');

      $url = Storage::url($fileName);

      return
        [
          'id' => $fileName,
          'url' => $url
        ];
    }

    public function delete(Request $request, $id) {
      return response()->json(['$request' => $request]);
    }

    public function test() {
      return response()->json(['world' => 'hello']);
    }
}
