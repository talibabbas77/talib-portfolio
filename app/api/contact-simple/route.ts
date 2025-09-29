import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.json();

        console.log('Received form data:', formData);

        // Validate required fields
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check environment variables
        const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM', 'EMAIL_TO'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

        if (missingVars.length > 0) {
            console.error('Missing environment variables:', missingVars);
            return NextResponse.json(
                { error: `Missing environment variables: ${missingVars.join(', ')}` },
                { status: 500 }
            );
        }

        console.log('Environment variables check passed');

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log('Transporter created');

        // Test connection
        try {
            await transporter.verify();
            console.log('SMTP connection verified successfully');
        } catch (verifyError) {
            console.error('SMTP verification failed:', verifyError);
            return NextResponse.json(
                { error: 'SMTP connection failed', details: verifyError instanceof Error ? verifyError.message : 'Unknown error' },
                { status: 500 }
            );
        }

        // Simple email template for testing
        const simpleEmailTemplate = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `;

        // Send notification email to you
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `New Contact Form Submission: ${formData.subject}`,
            html: simpleEmailTemplate,
        };

        console.log('Sending email to:', process.env.EMAIL_TO);
        console.log('From:', process.env.EMAIL_FROM);

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in contact API:', error);
        return NextResponse.json(
            {
                error: 'Failed to send email',
                details: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
