<?php

namespace App\Http\Services\Api;

use App\Enums\SupportTicketStatus;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\SupportTicketRepliedMail;

use App\Models\SupportTicket;

class AgentTicketService
{
    public function getAgentTickets($searchParams)
    {
        $search = isset($searchParams['search']) ? trim($searchParams['search']) : null;
        $tickets = SupportTicket::query()
            ->when($search, function ($query, $search) {
                $query->where('customer_name', 'like', '%' . $search . '%');
            })
            ->orderByDesc('created_at')
            ->paginate($searchParams['per_page'] ?? 5)
            ->withQueryString();

        return $tickets;
    }

    public function getTicketByReference($ticketReference)
    {
        $ticket = SupportTicket::where('reference_number', $ticketReference)->first();

        if (!$ticket) {
            throw new \Exception('Ticket not found');
        }

        if ($ticket->status === SupportTicketStatus::OPEN) {
            $this->changeTicketStatus($ticketReference, SupportTicketStatus::IN_PROGRESS);
        }

        return $ticket->load('comments');
    }

    public function addCommentToTicket($ticketReference, $comment)
    {
        $ticket = SupportTicket::where('reference_number', $ticketReference)->first();

        if (!$ticket) {
            throw new \Exception('Ticket not found');
        }

        $comment = $ticket->comments()->create([
            'comment' => $comment,
            'user_id' => Auth::guard('api')->user()->id,
        ]);

        Mail::to($ticket->customer_email)->send(new SupportTicketRepliedMail($ticket, $comment));

        return $comment->load('supportTicket');
    }

    public function changeTicketStatus($ticketReference, $status)
    {
        $ticket = SupportTicket::where('reference_number', $ticketReference)->first();

        if (!$ticket) {
            throw new \Exception('Ticket not found');
        }

        $ticket->status = $status;
        $ticket->save();

        return $ticket;
    }
}
