import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { valid: false },
        { status: 401 }
      );
    }

    try {
      // Decode the token to check if it contains 'admin'
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const [username, timestamp] = decoded.split(':');

      // Check if username is 'admin' and timestamp is valid (within 24 hours)
      if (username !== 'admin') {
        return NextResponse.json(
          { valid: false },
          { status: 401 }
        );
      }

      const tokenTime = parseInt(timestamp);
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - tokenTime > twentyFourHours) {
        return NextResponse.json(
          { valid: false },
          { status: 401 }
        );
      }

      return NextResponse.json({ valid: true });
    } catch (error) {
      return NextResponse.json(
        { valid: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.json(
      { valid: false },
      { status: 500 }
    );
  }
}
