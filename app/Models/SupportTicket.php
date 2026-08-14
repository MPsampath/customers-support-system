<?php

namespace App\Models;

use App\Enums\SupportTicketStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SupportTicket extends Model
{
    protected $fillable = [
        'reference_number',
        'description',
        'customer_name',
        'customer_phone',
        'customer_email',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => \App\Enums\SupportTicketStatus::class,
        ];
    }

    public static function generateReferenceNumber(): string
    {
        do {
            $reference = 'TCK-'.strtoupper(Str::random(10));
        } while (self::where('reference_number', $reference)->exists());

        return $reference;
    }

    public function comments()
    {
        return $this->hasMany(SupportTicketComments::class);
    }
}
