<?php

namespace App\Http\Services\Api;

use App\Models\SupportTicket;
use Illuminate\Support\Facades\Mail;
use App\Mail\SupportTicketCreatedMail;

class SupportTicketService
{
    public function store($data)
    {
        $supportTicket = new SupportTicket();
        $supportTicket->reference_number = SupportTicket::generateReferenceNumber();
        $supportTicket->description = $data['description'];
        $supportTicket->customer_name = $data['customer_name'];
        $supportTicket->customer_phone = $data['customer_phone'];
        $supportTicket->customer_email = $data['customer_email'];
        $supportTicket->save();

        Mail::to($supportTicket->customer_email)->send(new SupportTicketCreatedMail($supportTicket));

        return $supportTicket;
    }

    public function getTicket($ticketReference)
    {
        return SupportTicket::where('reference_number', $ticketReference)->first();
    }
}