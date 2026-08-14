<!doctype html>
<html>
<body style="font-family: Arial, sans-serif; color: #1f2937;">
    <h2>Hi {{ $ticket->customer_name }},</h2>
    <p>We've received your support request and a member of our team will get back to you soon.</p>
    <p>
        Your ticket reference number is:<br>
        <strong style="font-size: 18px;">{{ $ticket->reference_number }}</strong>
    </p>
    <p>Please keep this reference number safe &mdash; you'll need it to check the status of your ticket.</p>
    <p><strong>Description:</strong><br>{{ $ticket->description }}</p>
    <p>Thank you,<br>{{ config('app.name') }} Support Team</p>
</body>
</html>
