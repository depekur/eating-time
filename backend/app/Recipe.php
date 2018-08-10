<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Facades\JWTAuth;

class Recipe extends Model
{
    protected $primaryKey = 'recipe_id';

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'user_id');
    }

    public function country()
    {
      return $this->belongsTo('App\Country', 'country_id', 'country_id');
    }

    public function steps()
    {
        return $this->hasMany('App\RecipeStep', 'recipe_id', 'recipe_id');
    }

    public function comments()
    {
        return $this->hasMany('App\RecipeStep', 'recipe_id', 'recipe_id');
    }

    public function ingredients()
    {
        return $this->belongsToMany('App\Ingredient', 'recipe_ingredients', 'recipe_id', 'ingredients_id')
          ->as('info')
          ->withPivot('quantity');
    }

    public function destinations()
    {
        return $this->belongsToMany('App\Destination', 'recipe_destinations', 'recipe_id', 'destination_id');
    }

    public function categories()
    {
        return $this->belongsToMany('App\Category', 'recipe_categories', 'recipe_id', 'category_id');
    }

    public function favorites()
    {
      $token = JWTAuth::getToken();

      if ($token) {
        return $this->belongsToMany('App\User', 'favorite_recipes', 'recipe_id', 'user_id')
          ->where('favorite_recipes.user_id', JWTAuth::parseToken()->toUser()->user_id);
      } else {
        //return false;
        return $this->belongsToMany('App\User', 'favorite_recipes', 'recipe_id', 'user_id');
      }
    }
}
