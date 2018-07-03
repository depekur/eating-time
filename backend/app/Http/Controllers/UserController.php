<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function info(Request $request) {
      $token = $request->bearerToken();
      $user = JWTAuth::toUser($token);

      //$apy = JWTAuth::getPayload($token)->toArray();

      return $user;
    }
}
