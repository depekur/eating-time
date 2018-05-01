<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});




Route::post('user/register', 'Auth\APIRegisterController@register');
Route::post('user/login', 'Auth\APILoginController@login');
Route::post('recover', 'Auth\ApiRecoverPassController@recover');

Route::get('/', 'RecipeController@index');

// only for logged users
Route::group(['middleware' => 'jwt.auth'], function() {

    Route::post('logout', 'Auth\APILogoutController@logout');



    Route::get('users', function(Request $request) {
        return auth()->user();
    });

});