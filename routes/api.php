<?php

use App\Http\Controllers\Api\AgentTicketController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SupportTicketController;
use Illuminate\Support\Facades\Route;

Route::post('/ticket', [SupportTicketController::class, 'store']);
Route::get('/ticket/{ticketReference}', [SupportTicketController::class, 'show']);

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/create-user', [AuthController::class, 'createUser']);

Route::middleware('auth:api')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'getUser']);

    Route::get('/agent/tickets', [AgentTicketController::class, 'index']);
    Route::get('/agent/tickets/{ticketReference}', [AgentTicketController::class, 'show']);
    Route::post('/agent/tickets/{ticketReference}/comments', [AgentTicketController::class, 'addComment']);
    Route::post('/agent/tickets/{ticketReference}/status', [AgentTicketController::class, 'updateStatus']);

});
