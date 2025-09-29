import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Beautiful HTML email template for confirmation
const createConfirmationEmail = (name: string, subject: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Talib Abbas</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 32px;
                font-weight: bold;
                color: white;
                margin-bottom: 10px;
            }
            .subtitle {
                color: rgba(255,255,255,0.9);
                font-size: 16px;
            }
            .content {
                background: white;
                border-radius: 15px;
                padding: 30px;
                margin: 20px 0;
            }
            .greeting {
                font-size: 24px;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 20px;
            }
            .message {
                font-size: 16px;
                color: #4a5568;
                margin-bottom: 25px;
                line-height: 1.7;
            }
            .highlight {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 600;
            }
            .info-box {
                background: #f7fafc;
                border-left: 4px solid #667eea;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .info-title {
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 8px;
            }
            .info-text {
                color: #4a5568;
                font-size: 14px;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
            }
            .social-links {
                margin: 20px 0;
            }
            .social-link {
                display: inline-block;
                margin: 0 10px;
                padding: 10px 15px;
                background: #667eea;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
            }
            .signature {
                color: #718096;
                font-size: 14px;
                margin-top: 20px;
            }
            .heart {
                color: #e53e3e;
                animation: heartbeat 1.5s ease-in-out infinite;
            }
            @keyframes heartbeat {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Talib Abbas</div>
                <div class="subtitle">Full-Stack Developer & Digital Innovator</div>
            </div>
            
            <div class="content">
                <div class="greeting">Hello ${name}! 👋</div>
                
                <div class="message">
                    Thank you for reaching out to me regarding <span class="highlight">"${subject}"</span>. 
                    I'm thrilled to hear from you and excited about the possibility of working together!
                </div>
                
                <div class="info-box">
                    <div class="info-title">📧 What happens next?</div>
                    <div class="info-text">
                        • I've received your message and will review it carefully<br>
                        • You can expect a detailed response within 24 hours<br>
                        • I'll provide insights and discuss how we can bring your vision to life
                    </div>
                </div>
                
                <div class="message">
                    In the meantime, feel free to explore my portfolio and check out some of my recent projects. 
                    I'm passionate about creating exceptional digital experiences and innovative web solutions.
                </div>
                
                <div class="social-links">
                    <a href="#" class="social-link">🌐 Portfolio</a>
                    <a href="#" class="social-link">💼 LinkedIn</a>
                    <a href="#" class="social-link">🐙 GitHub</a>
                </div>
                
                <div class="footer">
                    <div class="signature">
                        Best regards,<br>
                        <strong>Talib Abbas</strong><br>
                        Full-Stack Developer<br>
                        📍 Lahore, Pakistan<br>
                        <br>
                        Made with <span class="heart">❤️</span> and modern web technologies
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Email template for notification to you
const createNotificationEmail = (formData: any) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 15px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                border-left: 5px solid #667eea;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 25px;
                text-align: center;
            }
            .title {
                font-size: 24px;
                font-weight: bold;
                margin: 0;
            }
            .subtitle {
                font-size: 14px;
                opacity: 0.9;
                margin-top: 5px;
            }
            .field {
                margin-bottom: 20px;
                padding: 15px;
                background: #f7fafc;
                border-radius: 8px;
                border-left: 3px solid #667eea;
            }
            .field-label {
                font-weight: 600;
                color: #2d3748;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
            }
            .field-value {
                color: #4a5568;
                font-size: 16px;
            }
            .message-field {
                background: #fff;
                border: 1px solid #e2e8f0;
                padding: 20px;
                border-radius: 8px;
                white-space: pre-wrap;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
                color: #718096;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 class="title">📧 New Contact Form Submission</h1>
                <p class="subtitle">Portfolio Website Contact Form</p>
            </div>
            
            <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${formData.name}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">${formData.email}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Subject</div>
                <div class="field-value">${formData.subject}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Message</div>
                <div class="field-value message-field">${formData.message}</div>
            </div>
            
            <div class="footer">
                <p>This message was sent from your portfolio contact form at ${new Date().toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
    try {
        const formData = await request.json();

        // Validate required fields
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check if environment variables are set
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing email environment variables');
            return NextResponse.json(
                { error: 'Email configuration is missing' },
                { status: 500 }
            );
        }

        // Test transporter connection
        try {
            await transporter.verify();
            console.log('Email transporter verified successfully');
        } catch (verifyError) {
            console.error('Email transporter verification failed:', verifyError);
            return NextResponse.json(
                { error: 'Email service configuration error' },
                { status: 500 }
            );
        }

        // Email to you (notification)
        const notificationMailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `New Contact Form Submission: ${formData.subject}`,
            html: createNotificationEmail(formData),
        };

        // Email to the sender (confirmation)
        const confirmationMailOptions = {
            from: process.env.EMAIL_FROM,
            to: formData.email,
            subject: `Thank you for contacting Talib Abbas - ${formData.subject}`,
            html: createConfirmationEmail(formData.name, formData.subject),
        };

        console.log('Attempting to send emails...');
        console.log('Notification email to:', process.env.EMAIL_TO);
        console.log('Confirmation email to:', formData.email);

        // Send both emails
        await Promise.all([
            transporter.sendMail(notificationMailOptions),
            transporter.sendMail(confirmationMailOptions)
        ]);

        console.log('Emails sent successfully');
        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
        return NextResponse.json(
            { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
