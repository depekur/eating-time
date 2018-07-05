<?php

namespace App\Http\Controllers;

use App;
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

  public function filters()
  {
    return [
      'destinations' => RecipeController::prepareRecipeDestinations(App\Destination::all()->toArray()),
      'categories' => RecipeController::prepareRecipeCategories(App\Category::all()->toArray()),
      'country' => RecipeController::prepareCountries(App\Country::all()->toArray())
    ];
  }

  public function getRecipeById($id)
  {
    $recipe = App\Recipe::with([
      'user',
      'steps',
      'ingredients',
      'categories',
      'destinations',
      'country'])
      ->where('recipe_id', $id )->get();

    return RecipeController::prepareFullRecipeData($recipe[0]);
  }

  public function getAllRecipes()
  {
    $data = App\Recipe::with(['categories', 'destinations'])->paginate(3);

    return [
      'paginator' => [
        'currentPage' => $data->currentPage(),
        'nextPage' => $data->hasMorePages() ? $data->currentPage() + 1 : false,
        'lastPage' => $data->lastPage(),
        'perPage' => $data->perPage(),
        'total' => $data->total()
      ],
      'recipes' => RecipeController::prepareShortRecipeData($data->items())
    ];
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



  private function moveRecipePhoto($file_name, $recipe_id)
  {
    Storage::move('temp/'.$file_name, 'images/'.$recipe_id.'/'.$file_name);

    //$url = Storage::url($recipe->recipe_id .'/'. $request->photo[0]['hash']);
  }

  private function saveIngredients($ingredients, $recipe)
  {
    foreach ($ingredients as $ingredient) {
      $ing = new App\RecipeIngredient();

      $ing->ingredients_id = $ingredient['id'];
      $ing->count = $ingredient['count'];
      $ing->measure = 'fuck';
      $ing->recipe_id = $recipe->recipe_id;

      $ing->save();
    }
  }

  private function saveCategories($categories, $recipe)
  {
    $categories_ids = [];

    foreach ($categories as $category) {
      $categories_ids[] = $category['id'];
    }

    $recipe->categories()->attach($categories_ids);
  }

  private function saveDestinations($destinations, $recipe)
  {
    $destinations_ids = [];

    foreach ($destinations as $destination) {
      $destinations_ids[] = $destination['id'];
    }

    $recipe->destinations()->attach($destinations_ids);
  }

  private function saveSteps($steps, $recipe)
  {
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

  private function prepareShortRecipeData($recipes)
  {
    $recipe_storage_url = Storage::url('/');

    return array_map(function($recipe) use ($recipe_storage_url) {
      return [
        'id' => $recipe['recipe_id'],
        'title' => $recipe['title'],
        'calories' => $recipe['calories'],
        'cookingTime' => $recipe['cooking_time'],
        'servingsCount' => $recipe['servings_count'],
        'img' => $recipe_storage_url . $recipe['recipe_id'] . '/' . $recipe['img_name'],
        'destinations' => RecipeController::prepareRecipeDestinations($recipe['destinations']->toArray()),
        'categories' => RecipeController::prepareRecipeCategories($recipe['categories']->toArray())
      ];
    }, $recipes);
  }

  private function prepareFullRecipeData($recipe)
  {
    $recipe_storage_url = Storage::url($recipe['recipe_id'] .'/');

    $prepared_recipe = [
      'id' => $recipe['recipe_id'],
      'title' => $recipe['title'],
      'body' => $recipe['body'],
      'calories' => $recipe['calories'],
      'cookingTime' => $recipe['cooking_time'],
      'img' => $recipe_storage_url . $recipe['img_name'],
      'isShortRecipe' => $recipe['is_short_recipe'],
      'servingsCount' => $recipe['servings_count'],

      'user' => [
        'id' => $recipe['user']['user_id'],
        'name' => $recipe['user']['name'],
        'avatar' => $recipe['user']['img_name'] ? $recipe_storage_url . $recipe['user']['img_name'] : null,
        'email' => $recipe['user']['email'],
      ],

      'country' => [
        'id' => $recipe['country_id'],
        'name' => $recipe['country']['name'],
      ],
    ];

    $prepared_recipe['destinations'] = RecipeController::prepareRecipeDestinations($recipe['destinations']->toArray());
    $prepared_recipe['categories'] = RecipeController::prepareRecipeCategories($recipe['categories']->toArray());

    $prepared_recipe['ingredients'] = array_map(function($ingredient) {
      return [
        'id' => $ingredient['id'],
        'name' => $ingredient['name'],
        'calories' => $ingredient['calories'],
        'carbs' => $ingredient['carbs'],
        'fat' => $ingredient['fat'],
        'category' => $ingredient['category'],
        'count' => $ingredient['info']['count'],
        'measure' => $ingredient['info']['measure'],
      ];
    }, $recipe['ingredients']->toArray());

    $prepared_recipe['steps'] = array_map(function($step) use ($recipe_storage_url) {
      return [
        'id' => $step['step_number'],
        'body' => $step['description'],
        'img' => $step['img_name'] ? $recipe_storage_url . $step['img_name'] : null,
      ];
    }, $recipe['steps']->toArray());

    return $prepared_recipe;
  }

  private function prepareRecipeCategories($categories)
  {
    return array_map(function($category) {
      return [
        'id' => $category['category_id'],
        'name' => $category['category_name']
      ];
    }, $categories);
  }

  private function prepareCountries($countries)
  {
    return array_map(function($country) {
      return [
        'id' => $country['country_id'],
        'name' => $country['name']
      ];
    }, $countries);
  }

  private function prepareRecipeDestinations($destinations)
  {
    return array_map(function($destination) {
      return [
        'id' => $destination['destination_id'],
        'name' => $destination['name']
      ];
    }, $destinations);
  }
}
