<?php

namespace App\Http\Services\Api;

use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

use Exception;

class AuthService
{
    public function login($credentials)
    {
        if (! $token = Auth::guard('api')->attempt($credentials)) {
            throw new Exception('Invalid credentials');
        }

        return $token;
    }

    public function logout()
    {
        // Implement your logout logic here
    }

    public function getUser()
    {
        // Implement your getUser logic here
    }
}