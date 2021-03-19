<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobApplied;
use Illuminate\Http\Request;
use PHPUnit\Framework\Constraint\Count;

class JobController extends Controller
{
    //
    public function index(){
        return Job::orderBy('job_id', 'desc')->get();
    }

    public function getJob($job_id){
        return Job::where("job_id", $job_id)->orderBy('job_id', 'desc')->get();
    }

    public function create(Request $req){
        $recruiter_id = $req->user()->user_id;
        $arr = $req->all();
        $arr['recruiter_id'] = $recruiter_id;

        $job =  Job::create($arr);
        return response()->json($job, 201);
    }

    public function update(Request $req, $job_id){        
        $job =  Job::findorfail($job_id);
        return response()->json($job, 201);
    }

    public function getUserAppliedJobs(Request $req){
        $user_id = $req->user()->user_id;
        return Job::join("job_applied", "jobs.job_id", "=", "job_applied.job_id")
        ->where("job_applied.user_id", $user_id)->get();
        
    }

    public function getRecruiterJobs(Request $req){
        $rec_id = $req->user()->user_id;
        return Job::where("jobs.recruiter_id", $rec_id)
        ->get();
        
    }

    public function applyJob(Request $req, $job_id){
        $user_id = $req->user()->user_id;
        $data['job_id'] = $job_id;
        $data['user_id'] = $user_id;

        $applied = JobApplied::where("job_id", $job_id)->where("user_id", $user_id)->get()->toArray();

        if(count($applied) > 0){
            return response()->json([
                "error" => "Already applied"
            ], 403);
        }else{
            $applied = JobApplied::create($data);
            return response()->json([
                $applied
            ], 200);
        }

        
    }
}
