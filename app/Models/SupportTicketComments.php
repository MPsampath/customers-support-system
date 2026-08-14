<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupportTicketComments extends Model
{
    protected $fillable = [
        'support_ticket_id',
        'comment',
        'user_id',
    ];

    public function supportTicket()
    {
        return $this->belongsTo(SupportTicket::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
