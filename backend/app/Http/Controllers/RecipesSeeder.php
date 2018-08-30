<?php

namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;

class RecipesSeeder extends Controller
{
  public function index()
  {
    ini_set('max_execution_time', 9000);

    $path = storage_path() . "/json/recipes_";
    $recipe_files = array_diff(scandir($path), array('..', '.'));

    foreach ($recipe_files as $recipe_file) {
      $recipes = json_decode(file_get_contents($path . '/' . $recipe_file));

      foreach ($recipes as $recipe) {
        $_recipe = new App\Recipe();

        $_recipe->is_short_recipe = 1;
        $_recipe->recipe_link = $recipe->url;

        $_recipe->user_id = 1;

        if (isset($recipe->portions)) {
          $_recipe->servings_count = $recipe->portions ? $recipe->portions : 1;
        } else {
          $_recipe->servings_count = 1;
        }

        if (isset($recipe->title)) {
          $_recipe->title = $recipe->title;
        }

        if (isset($recipe->body)) {
          $_recipe->body = $recipe->body;
        }

        if (isset($recipe->imgMain)) {
          if ($recipe->imgMain == 'https://www.povarenok.ru/images/recipes/1.gif') {
            $_recipe->img_name = Storage::url('/') . 'dish.png';
          } else {
            $_recipe->img_name = $recipe->imgMain;
          }
        } else {
          $_recipe->img_name = Storage::url('/') . 'dish.png';
        }

        $_recipe->calories = 0;

        if (isset($recipe->cookingTime)) {
          $_recipe->cooking_time = $recipe->cookingTime ? $recipe->cookingTime : 30;
        } else {
          $_recipe->cooking_time = 30;
        }

        if ($recipe->kitchensIds) {
          $_recipe->country_id = $recipe->kitchensIds[0];
        }

        $_recipe->save();

        if (isset($recipe->catsIds)) {
          if (!empty($recipe->catsIds)) {
            $_recipe->categories()->attach($recipe->catsIds);
          }
        }

        if (isset($recipe->destinyIds)) {
          if (!empty($recipe->destinyIds)) {
            $_recipe->destinations()->attach($recipe->destinyIds);
          }
        }

        if (!empty($recipe->ingredients)) {
          if (!empty($recipe->ingredients[0]->id)) {
            foreach ($recipe->ingredients as $ingredient) {

              if (isset($ingredient->id)) {
                $ing = new App\RecipeIngredient();
                $ing->ingredients_id = $ingredient->id;
                $ing->recipe_id = $_recipe->recipe_id;

                if (isset($ingredient->amount)) {
                  $ing->quantity = $ingredient->amount;
                }

                $ing->save();
              }


            }
          }
        }

        if (!empty($recipe->steps)) {
          if (!empty($recipe->steps[0]->body) || !empty($recipe->steps[0]->img)) {
            foreach ($recipe->steps as $key => $step) {


              if (isset($step->body)) {
                $stp = new App\RecipeStep();

                $stp->recipe_id = $_recipe->recipe_id;
                $stp->step_number = $key + 1;
                $stp->description = $step->body;

                if (isset($step->img)) {
                  $stp->img_name = $step->img;
                }

                $stp->save();
              }
            }
          }
        }

        //dd($recipe);
      }
    }
  }

  public function updateEmptySteps()
  {
    ini_set('max_execution_time', 9000);


//    $_recipe = App\Recipe::where('recipe_link', 'https://www.povarenok.ru/recipes/show/88021/')->get()->toArray();
//
//    dd($_recipe[0]['recipe_id']);


    $path = storage_path() . "/json/recipes-without-steps";
    $recipe_files = array_diff(scandir($path), array('..', '.'));

    foreach ($recipe_files as $recipe_file) {
      $recipes = json_decode(file_get_contents($path . '/' . $recipe_file));

      foreach ($recipes as $recipe) {
        $_recipe = App\Recipe::where('recipe_link', $recipe->url)->get()->toArray()[0];

        if (!empty($recipe->steps)) {
          if (isset($recipe->steps[0]->body)) {
            if (!empty($recipe->steps[0]->body)) {
              $stp = new App\RecipeStep();

              $stp->recipe_id = $_recipe['recipe_id'];
              $stp->step_number = 1;
              $stp->description = $recipe->steps[0]->body;

              $stp->save();
            }
          }
        }
      }
    }
  }
}
