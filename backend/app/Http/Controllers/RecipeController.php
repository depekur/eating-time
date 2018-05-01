<?php

namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;


class RecipeController extends Controller
{
    public function index ()
    {
        $recipes = App\Recipe::with(['user', 'category', 'steps'])->get();
//        $user = $recipes->user;
//
//        $data = [
//            'recipe' => $recipes,
//            'user' => $user
//        ];

        return $recipes;
        //return view('welcome', ['recipes' => $recipes]);
    }
}
