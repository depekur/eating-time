<?php

namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;

class IngredientsSeeder extends Controller
{
    public function index() {
		 $path = storage_path() . "/json/ingredients1.json";

		 $data = json_decode(file_get_contents($path), true);

		 //App\Ingredient::insert($data);

		 //dd($json);

	 }
}
