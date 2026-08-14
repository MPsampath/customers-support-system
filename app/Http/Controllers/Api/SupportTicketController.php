<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\SupportTicketRequest;
use App\Http\Controllers\Controller;
use App\Http\Services\Api\SupportTicketService;

class SupportTicketController extends Controller
{
    public function store(SupportTicketRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $supportTicket = (new SupportTicketService)->store($validatedData);
            return response()->json(['data' => $supportTicket, 'message' => 'Support ticket created successfully'], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'An error occurred while creating the support ticket', 'error' => $th->getMessage()], 500);
        }
    }

    public function show($ticketReference)
    {
        try {
            $supportTicket = (new SupportTicketService)->getTicket($ticketReference);
            if (!$supportTicket) {
                return response()->json(['message' => 'Support ticket not found'], 404);
            }
            
            return response()->json([
                'reference_number' => $supportTicket->reference_number,
                'customer_name' => $supportTicket->customer_name,
                'customer_email' => $supportTicket->customer_email,
                'customer_phone' => $supportTicket->customer_phone,
                'description' => $supportTicket->description,
                'status' => $supportTicket->status,
                'created_at' => $supportTicket->created_at,
                'comments' => $supportTicket->comments->map(fn($comment) => [
                    'comment' => $comment->comment,
                    'agent' => $comment->user?->name,
                    'created_at' => $comment->created_at,
                ]),
            ]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'An error occurred while retrieving the support ticket', 'error' => $th->getMessage()], 500);
        }
    }
}
