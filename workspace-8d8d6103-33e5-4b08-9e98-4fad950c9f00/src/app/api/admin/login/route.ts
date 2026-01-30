import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simple hardcoded credentials for demo purposes
    // In production, use proper authentication with bcrypt
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'RealTrust@2025';

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session token with timestamp for validation
    const timestamp = Date.now();
    const token = Buffer.from(`${username}:${timestamp}`).toString('base64');

    return NextResponse.json({
      token,
      admin: {
        username,
        timestamp,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
