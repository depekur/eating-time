<?php

namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class RationController extends Controller
{
    public function getUserDayRation($date) {
      $user_id = JWTAuth::parseToken()->toUser()->user_id;

      $ration = App\UserMenuRecipe::where('user_id', $user_id)
                                  ->where('date', $date)
                                  ->get();

      //dd($ration->toArray());

      $res = $ration->toArray();

      return !empty($res)
        ? [
          'date' => $res[0]['date'],
          'food' => json_decode($res[0]['food'])
          ]
        : [
            'date' => $date,
            'food' => []
          ];
    }

    public function getUserIntervalRation($start_date, $end_date) {
      $user_id = JWTAuth::parseToken()->toUser()->user_id;

      return App\UserMenuRecipe::where('user_id', $user_id)
                               ->where('date', '<=', $start_date)
                               ->where('date', '>=', $end_date)
                               ->get();
    }

    public function updateRation(Request $request) {
      $user_id = JWTAuth::parseToken()->toUser()->user_id;

      $ration = App\UserMenuRecipe::where('user_id', $user_id)
        ->where('date', $request->date)
        ->first();

      if (!$ration) {
        $ration = new App\UserMenuRecipe();
      }

      $ration->user_id = $user_id;
      $ration->date = $request->date;
      $ration->food = json_encode($request->food);

      $ration->save();

      return ['status' => 'ok'];
    }
}
