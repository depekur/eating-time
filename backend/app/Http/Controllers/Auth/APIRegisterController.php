<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use JWTFactory;
use JWTAuth;
use Validator;
use Response;

class APIRegisterController extends Controller
{
    public function register(Request $request)
    {
        $credentials = $request->only('username', 'email', 'password');

        $rules = [
            'username' => 'required|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|min:6',
        ];

        $validator = Validator::make($credentials, $rules);

        if ($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->errors()]);
        }

        User::create([
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => \Illuminate\Support\Facades\Hash::make($request->get('password')),
            'role' => 'user',
            'notifications' => 0
        ]);

        $user = User::first();
        $token = JWTAuth::fromUser($user);

        return Response::json(['token'=> $token], 200);
    }
}