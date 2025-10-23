import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { render } from '@react-email/render'; 
import ContactFormEmail from '@/app/components/ContactFormEmail'; 

const recipientEmail = 'tharindumaheshk@gmail.com'; 

export async function POST(req: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;

    // CRITICAL DEBUGGING LOGS 
    console.log(`[DEBUG] RESEND_API_KEY is defined: ${!!apiKey}`);
    console.log(`[DEBUG] FROM_EMAIL is defined: ${!!fromEmail} (Value: ${fromEmail})`);

    if (!apiKey) {
        console.error("Missing RESEND_API_KEY. Cannot initialize Resend.");
        return NextResponse.json({ error: 'Server configuration error: Resend key missing.' }, { status: 500 });
    }
    
    if (!fromEmail || !recipientEmail) {
        console.error("Missing FROM_EMAIL or Recipient Email in API route configuration.");
        return NextResponse.json({ error: 'Server configuration error: From/Recipient email missing.' }, { status: 500 });
    }
    
    const resend = new Resend(apiKey);
    
    try {
        const body = await req.json();
        const { email, subject, message } = body;

        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        console.log(`[DEBUG] Attempting to send email to ${recipientEmail} from ${email} with subject: ${subject}`);

        // --- FIX 1: Use 'await' to resolve the Promise<string> to a plain string ---
        const emailHtml = await render(
            ContactFormEmail({ email, message })
        );

        const data = await resend.emails.send({
            from: fromEmail, 
            to: [recipientEmail], 
            subject: subject,
            replyTo: email, 
            html: emailHtml,
        });

        if (data.error) {
            console.error("Resend API Error:", data.error); 
            return NextResponse.json({ error: data.error.message || 'Resend API failed with unknown error.' }, { status: 500 });
        }
        
        // --- FIX 2: Access the ID correctly via data.data.id ---
        const emailId = data.data?.id;

        console.log(`[DEBUG] Email sent successfully via Resend. ID: ${emailId}`);
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
        
    } catch (error) {
        console.error("Internal Server Error (Catch Block):", error);
        return NextResponse.json({ error: 'Something went wrong (Internal Server Error)' }, { status: 500 });
    }
}
