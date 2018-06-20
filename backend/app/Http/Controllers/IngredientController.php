<?php

namespace App\Http\Controllers;

use App;
use App\Ingredient as Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
   public function search($value) {
    return Ingredient::where('name', 'LIKE', '%'.$value.'%')->get(['id', 'name', 'category']);


     //return App\Ingredient::with(['id', 'name', 'category'])->where('name', 'LIKE', '%'.$value.'%')->get();
   }
}
