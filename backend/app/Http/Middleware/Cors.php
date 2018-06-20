<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \Closure $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$url = config('app.front_url');

		header("Access-Control-Allow-Origin: {$url}");
		header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With, X-Auth-Token');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
		header('Access-Control-Allow-Credentials: true');

		return $next($request);
	}
}
