<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AuthRequest;
use App\Http\Services\Api\AuthService;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(AuthRequest $request)
    {
       try {
        $credentials = $request->validated();
        $token = (new AuthService())->login($credentials);
   
        return $this->responseWithToken($token);

       } catch (\Throwable $th) {
        return response()->json(['message' => 'The provided credentials are incorrect.'], 401);
       }
    }

    public function createUser(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string',
            ]);

            $user = \App\Models\User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
            ]);

            // Generate a token for the newly created user
            $token = JWTAuth::fromUser($user);

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'User creation failed', 'error' => $th->getMessage()], 400);
        }
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        Auth::guard('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
    

    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }

    public function responseWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => Auth::guard('api')->user(),
        ]);
    }
}