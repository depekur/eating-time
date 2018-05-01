<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FavoriteRecipe extends Model
{
    protected $table = 'favorite_recipes';
    public $timestamps = false;
}
