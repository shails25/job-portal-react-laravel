<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplied extends Model
{
    use HasFactory;
    protected $table ='job_applied';
    protected $fillable = ["user_id", "job_id"];
}
