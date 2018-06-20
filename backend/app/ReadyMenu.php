<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReadyMenu extends Model
{
    protected $table = 'ready_menu';
    protected $primaryKey = 'ready_menu_id';

    public $timestamps = false;
}
