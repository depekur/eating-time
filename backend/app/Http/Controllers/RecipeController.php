<?php

namespace App\Http\Controllers;

use App;
use App\Ingredient;
use Illuminate\Http\Request;


class RecipeController extends Controller
{
    public function index ()
    {
        $recipes = App\Recipe::with(['user', 'steps', 'ingredients', 'categories', 'destinations'])->get();

        $user = App\User::with(['menuRecipes'])->get();

//        $user = $recipes->user;
//
//        $data = [
//            'recipe' => $recipes,
//            'user' => $user
//        ];

        //return $user . $recipes;

        return response()->json(['user' => $user, 'recipes' => $recipes]);

        //return view('welcome', ['recipes' => $recipes]);
    }

    public function recipeMeta()
	 {
	 	$output = [];

		$output['category'] = App\Category::all();
		$output['country'] = App\Country::all();
		$output['destination'] = App\Destination::all();

    	return $output;
	 }

	public function ingredients()
	{
		return App\Ingredient::all(['id', 'name', 'category']);
	}
}
