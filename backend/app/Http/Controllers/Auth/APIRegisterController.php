<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use JWTFactory;
use JWTAuth;
use Validator;
use Response;
use App;
use DateTime;

class APIRegisterController extends Controller
{
  public function register(Request $request)
  {
    $credentials = $request->only('name', 'email', 'password');

    $messages = array(
      'email.unique' => 'Такой e-mail уже занят',
    );

    $rules = [
      'name' => 'required|max:255|unique:users',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => 'required|min:6',
    ];

    $validator = Validator::make($credentials, $rules, $messages);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 503);
    }

    $user = User::create([
      'name' => $request->get('name'),
      'email' => $request->get('email'),
      'password' => \Illuminate\Support\Facades\Hash::make($request->get('password'))
    ]);

    $settings = $this->addDefaultUserSettings($user->user_id);

    $token = JWTAuth::fromUser($user);

    return Response::json([
      'token' => $token,
      'user' => $user,
      'settings' => $settings
    ], 200);
  }

  private function addDefaultUserSettings($user_id)
  {
    $settings = new App\Settings();

    $settings->user_id = $user_id;

    $date = [
      ['hours' => 7, 'minutes' => 30],
      ['hours' => 10, 'minutes' => 0],
      ['hours' => 13, 'minutes' => 0],
      ['hours' => 17, 'minutes' => 0],
      ['hours' => 20, 'minutes' => 0],
    ];

    $settings->eating_time = json_encode($date);

    $settings->save();

    return $settings;
  }
}