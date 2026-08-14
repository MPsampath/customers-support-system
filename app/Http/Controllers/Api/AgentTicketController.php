<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\NewCommentNotification;
use Illuminate\Support\Facades\Mail;
use App\Http\Services\Api\AgentTicketService;
use App\Mail\SupportTicketRepliedMail;

class AgentTicketController extends Controller
{
    public function index()
    {
        try {
            $searchParams = request()->all();
            $tickets = (new AgentTicketService)->getAgentTickets($searchParams);

            return response()->json($tickets);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function show($ticketReference)
    {
        try {
            $ticket = (new AgentTicketService)->getTicketByReference($ticketReference);

            if (!$ticket) {
                return response()->json(['message' => 'Ticket not found'], 404);
            }

            return response()->json($ticket);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function addComment($ticketReference)
    {
        try {
            $commentData = request()->validate([
                'comment' => 'required|string',
                
            ]);

            $ticket = (new AgentTicketService)->addCommentToTicket($ticketReference, $commentData['comment']);

            return response()->json(['data' => $ticket->latestComment, 'message' => 'Comment added successfully'], 201);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }
}