<?php

namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function info(Request $request) {
      $token = $request->bearerToken();
      $user = JWTAuth::toUser($token);

      $settings = App\Settings::where('user_id', $user->user_id)->get()->toArray();

      //dd($settings);

      //$settings[0]['eating_time'] = json_encode($settings[0]['eating_time']);

      return [
        'user' => $user,
        'settings' => [
          'eating_time' => json_decode($settings[0]['eating_time']),

        ]
      ];
    }
}
