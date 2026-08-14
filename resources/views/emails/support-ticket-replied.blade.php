<!doctype html>
<html>
<body style="font-family: Arial, sans-serif; color: #1f2937;">
    <h2>Hi {{ $ticket->customer_name }},</h2>
    <p>A support agent has replied to your ticket <strong>{{ $ticket->reference_number }}</strong>:</p>
    <blockquote style="border-left: 4px solid #6366f1; margin: 16px 0; padding: 8px 16px; background: #f5f5f5;">
        {{ $comment->comment }}
    </blockquote>
    <p>You can view the full conversation by checking your ticket status with your reference number.</p>
    <p>Thank you,<br>{{ config('app.name') }} Support Team</p>
</body>
</html>
