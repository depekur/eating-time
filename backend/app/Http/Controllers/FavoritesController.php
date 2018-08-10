<?php

namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class FavoritesController extends Controller
{
  public function addToFavorite(Request $request) {
    $token = $request->bearerToken();
    $user_id = JWTAuth::toUser($token)->user_id;

    $recipe_id = $request->recipeId;

    $fav = new App\FavoriteRecipe();
    $fav->recipe_id = $recipe_id;
    $fav->user_id = $user_id;
    $fav->save();

    return $fav;
  }

  public function deleteFromFavorite(Request $request, $id) {
    $token = $request->bearerToken();
    $user_id = JWTAuth::toUser($token)->user_id;

    return App\FavoriteRecipe::where('recipe_id', $id)->where('user_id', $user_id)->delete();
  }
}
