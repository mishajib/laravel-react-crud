<?php

use App\Http\Controllers\Api\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Customer Resourceful Routes
Route::apiResource('customers', CustomerController::class);
Route::get('search/customers/{field}/{query}', [CustomerController::class, 'search']);
