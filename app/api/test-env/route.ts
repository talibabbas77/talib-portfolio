import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Check environment variables (without exposing sensitive data)
    const envCheck = {
        EMAIL_HOST: process.env.EMAIL_HOST ? 'Set' : 'Missing',
        EMAIL_PORT: process.env.EMAIL_PORT ? 'Set' : 'Missing',
        EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Missing',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Missing',
        EMAIL_FROM: process.env.EMAIL_FROM ? 'Set' : 'Missing',
        EMAIL_TO: process.env.EMAIL_TO ? 'Set' : 'Missing',
    };

    return NextResponse.json({
        message: 'Environment variables check',
        environment: envCheck,
        nodeEnv: process.env.NODE_ENV,
    });
}
