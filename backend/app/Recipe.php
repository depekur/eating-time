<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $primaryKey = 'recipe_id';

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'user_id');
    }

    public function category()
    {
        return $this->hasMany('App\RecipeCategory', 'category_id', 'category_id');
    }

    public function steps()
    {
        return $this->hasMany('App\RecipeStep', 'recipe_id', 'recipe_id');
    }

    public function comments()
    {
        return $this->hasMany('App\RecipeStep', 'recipe_id', 'recipe_id');
    }
}
