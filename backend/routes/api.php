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


Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');

Route::post('register', 'Auth\APIRegisterController@register');
Route::post('login', 'Auth\APILoginController@login');
Route::post('recover', 'Auth\ApiRecoverPassController@recover');


//Route::get('seed-ingredients', 'IngredientsSeeder@index');



Route::get('/recipes-meta', 'RecipeController@recipeMeta');
//Route::get('/ingredients', 'RecipeController@ingredients');


Route::get('/ingredients/{value}', 'IngredientController@search');

Route::get('/recipe/{id}', 'RecipeController@getRecipeById');
Route::post('/recipes', 'RecipeController@getAllRecipes');


/**
 *  only for logged users
 */
Route::group(['middleware' => 'jwt.auth'], function() {

  /**
   *  files api
   */
  Route::post('file/upload', 'FileController@upload');
  Route::delete('file/delete/{id}', 'FileController@delete');

  /**
   *  recipe api
   */
  Route::post('add-recipe', 'RecipeController@saveRecipe');

  /**
   *  user api
   */
  Route::get('/user', 'UserController@info');

  /**
   *  auth api
   */
  Route::post('logout', 'Auth\APILogoutController@logout');
});