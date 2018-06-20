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
        $credentials = $request->only('name', 'email', 'password');

		 $messages = array(
			 'email.unique' => 'Такое мыло уже занято, йоу',
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

        User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => \Illuminate\Support\Facades\Hash::make($request->get('password'))
        ]);

        $user = User::first();
        $token = JWTAuth::fromUser($user);

        return Response::json(['token'=> $token], 200);
    }
}