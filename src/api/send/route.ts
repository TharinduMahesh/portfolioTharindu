// src/app/api/send/route.ts

import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import ContactFormEmail from '../../app/components/ContactFormEmail'; // We will create this next

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL; // e.g., 'onboarding@resend.dev'

export async function POST(req: Request) {
  try {
    // Parse the request body to get the form data
    const body = await req.json();
    const { email, subject, message } = body;

    if (!email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: fromEmail!, 
      to: ['your-personal-email@gmail.com'], // 
      subject: subject,
      replyTo: email, 
      
      react: ContactFormEmail({ email, message }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}