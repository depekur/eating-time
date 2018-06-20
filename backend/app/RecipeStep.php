<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecipeStep extends Model
{
    protected $table = 'recipe_steps';
    protected $primaryKey = 'recipe_step_id';

    public $timestamps = false;
}
