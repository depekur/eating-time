<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecipeCategory extends Model
{
    protected $table = 'recipe_category';
    protected $primaryKey = 'category_id';
    public $timestamps = false;
}
