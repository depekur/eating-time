<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
	public $timestamps = false;

	protected $fillable = [
		'name', 'category', 'calories', 'fat', 'proteins', 'carbs'
	];


  public function category()
  {
    return $this->belongsTo('App\IngredientsCategory', 'category', 'id');
  }
}
