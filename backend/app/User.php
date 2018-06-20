<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\ResetPasswordNotification;

class User extends Authenticatable
{
    use Notifiable;

    protected $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role', 'notifications'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Отправка уведомления о сбросе пароля.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }


    /**
     * User relationship
     *
     */

    public function recipes()
    {
        return $this->hasMany('App\Recipe', 'user_id', 'user_id');
    }

    public function menuRecipes()
    {
        return $this->belongsToMany('App\Recipe', 'user_menu_recipes', 'user_id', 'recipe_id')
                    ->as('menu_info')
                    ->withPivot('ready_menu_id', 'date', 'eating_order', 'dish_order', 'is_ready_menu_pattern')
                    ->withTimestamps();
    }
}