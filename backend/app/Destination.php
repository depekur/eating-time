<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $table = 'destination';
    protected $primaryKey = 'destination_id';

    public $timestamps = false;
}
