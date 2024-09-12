<?php

namespace App\Http\Controllers;

use App\Events\CounterIncremented;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        $counter = (int) $request->session()->get('counter', 0) + 1;

        return Inertia::render('Dashboard', [
            'counter' => $counter,
        ]);
    }

    public function increment(Request $request)
    {
        $counter = (int) $request->session()->get('counter', 0) + 1;
        $request->session()->put('counter', $counter);

        return Redirect::to('dashboard');
    }

    public function incrementSocket(Request $request)
    {
        $count = Cache::get('counter', 0);
        $count++;
        Cache::set('counter', $count, 60 * 10); // 10min

        CounterIncremented::dispatch($count);

        return response(null, HttpResponse::HTTP_NO_CONTENT);
    }
}
