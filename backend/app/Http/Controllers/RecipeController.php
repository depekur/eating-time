<?php

namespace App\Http\Controllers;

use App;
use App\Ingredient;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Storage;


class RecipeController extends Controller
{
  public function index()
  {
    $recipes = App\Recipe::with(['steps', 'ingredients', 'categories', 'destinations'])->get();

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


  public function getRecipeById($id) {
    $recipe = App\Recipe::with(['user', 'steps', 'ingredients', 'categories', 'destinations', 'country'])
      ->where('recipe_id', $id )
      ->get();

    //$url = Storage::url($recipe->recipe_id .'/'. $request->photo[0]['hash']);

    //$recipe[0]['photo_url'] = Storage::url($id .'/');

    return $recipe[0];
  }

  public function getAllRecipes() {
    return App\Recipe::with(['categories', 'destinations'])
      ->paginate(3);
  }

  public function saveRecipe(Request $request)
  {
//    $this->validate($request, [
//      'photo' => 'required|file|mimes:jpg,jpeg,png,bmp,gif',
//    ]);

    $token = $request->bearerToken();
    $user = JWTAuth::toUser($token);

    $recipe = new App\Recipe();

    $recipe->user_id = $user->user_id;
    $recipe->servings_count = $request->servings_count ? $recipe->servings_count : 0;
    $recipe->title = $request->title;
    $recipe->body = $request->body;

    $recipe->img_name = $request->photo[0]['hash'];

    $recipe->calories = $request->calories;
    $recipe->cooking_time = $request->cookingTime;
    $recipe->servings_count = $request->servingsCount;

    if (!empty($request->countries)) {
      $recipe->country_id = $request->countries[0]['id'];
    }

    $recipe->save();

    RecipeController::moveRecipePhoto($request->photo[0]['hash'], $recipe->recipe_id);

    if (!empty($request->ingredients)) {
      if (!empty($request->ingredients[0]['id']) && !empty($request->ingredients[0]['name'])) {
        RecipeController::saveIngredients($request->ingredients, $recipe);
      }
    }

    if (!empty($request->categories)) {
      RecipeController::saveCategories($request->categories, $recipe);
    }

    if (!empty($request->destinations)) {
      RecipeController::saveDestinations($request->destinations, $recipe);
    }

    if (!empty($request->steps)) {
      if (!empty($request->steps[0]['step_text']) || !empty($request->steps[0]['step_photo'])) {
        RecipeController::saveSteps($request->steps, $recipe);
      }
    }


   // dd($url);
//
//    $respRecipe = App\Recipe::with(['steps', 'ingredients', 'categories', 'destinations'])
//      ->where('recipe_id', $recipe->recipe_id )
//      ->get();
//
//    $respRecipe[0]['photo_url'] = Storage::url($recipe->recipe_id .'/');

    //$respRecipe['photo_url'] = $respRecipe

    //return response()->json(['recipe' => $respRecipe[0]]);
    return response()->json(['id' => $recipe->recipe_id]);
  }



  private function moveRecipePhoto($file_name, $recipe_id) {
    Storage::move('temp/'.$file_name, 'images/'.$recipe_id.'/'.$file_name);

    //$url = Storage::url($recipe->recipe_id .'/'. $request->photo[0]['hash']);
  }

  private function saveIngredients($ingredients, $recipe) {
    foreach ($ingredients as $ingredient) {
      $ing = new App\RecipeIngredient();

      $ing->ingredients_id = $ingredient['id'];
      $ing->count = $ingredient['count'];
      $ing->measure = 'fuck';
      $ing->recipe_id = $recipe->recipe_id;

      $ing->save();
    }
  }

  private function saveCategories($categories, $recipe) {
    $categories_ids = [];

    foreach ($categories as $category) {
      $categories_ids[] = $category['id'];
    }

    $recipe->categories()->attach($categories_ids);
  }

  private function saveDestinations($destinations, $recipe) {
    $destinations_ids = [];

    foreach ($destinations as $destination) {
      $destinations_ids[] = $destination['id'];
    }

    $recipe->destinations()->attach($destinations_ids);
  }

  private function saveSteps($steps, $recipe) {
    foreach ($steps as $step) {
      $stp = new App\RecipeStep();

      $stp->recipe_id = $recipe->recipe_id;
      $stp->step_number = $step['id'];
      $stp->description = $step['step_text'];

      if (!empty($step['step_photo'])) {
        $stp->img_name = $step['step_photo'][0]['hash'];

        RecipeController::moveRecipePhoto($step['step_photo'][0]['hash'], $recipe->recipe_id);
      }

      $stp->save();
    }
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
