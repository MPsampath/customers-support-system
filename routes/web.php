<?php


use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

Route::get('/', function () {
     return Inertia::render('Welcome', [
        //  'canLogin' => Route::has('login'),
        //  'canRegister' => Route::has('register'),
         'laravelVersion' => Application::VERSION,
         'phpVersion' => PHP_VERSION,
     ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/support-tickets/new', fn () => Inertia::render('SupportTicket/Create'))->name('support-tickets.create');
Route::get('/tickets/status', fn () => Inertia::render('Tickets/Status'))->name('tickets.status');

// Support agent pages, protected client-side by the JWT stored after login.
Route::get('/agent/login', fn () => Inertia::render('Agent/Login'))->name('agent.login');
Route::get('/agent/tickets', fn () => Inertia::render('Agent/SupportTickets/Index'))->name('agent.tickets.index');
Route::get('/agent/tickets/{ticket}', fn (string $ticket) => Inertia::render('Agent/SupportTickets/Show', ['ticketId' => $ticket]))->name('agent.tickets.show');