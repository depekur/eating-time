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
//Route::get('seed-recipes', 'RecipesSeeder@index');

Route::get('/test', 'Auth\APIRegisterController@test');

Route::get('/filters', 'RecipeController@filters');
//Route::get('/ingredients', 'RecipeController@ingredients');


Route::get('/ingredients/{value}', 'IngredientController@search');

Route::get('/recipe/{id}', 'RecipeController@getRecipeById');
Route::get('/recipes', 'RecipeController@getRecipes');




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
   *  favorites recipes api
   */
  Route::post('/favorite', 'FavoritesController@addToFavorite');
  Route::delete('/favorite/{id}', 'FavoritesController@deleteFromFavorite');

  /**
   *  ration api
   */
  Route::get('ration/{date}', 'RationController@getUserDayRation');
  Route::get('ration/interval', 'RationController@getUserIntervalRation');
  Route::post('ration', 'RationController@updateRation');
//  Route::delete('ration', 'RationController@addRecipeToRation');

  /**
   *  user api
   */
  Route::get('/user', 'UserController@info');

  /**
   *  auth api
   */
  Route::post('logout', 'Auth\APILogoutController@logout');
});