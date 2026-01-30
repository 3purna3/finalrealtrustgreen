import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all subscribers (admin only)
export async function GET() {
  try {
    const subscribers = await db.subscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

// POST create a new subscriber
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await db.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    const subscriber = await db.subscriber.create({
      data: { email },
    });

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    console.error('Error creating subscriber:', error);
    return NextResponse.json(
      { error: 'Failed to create subscriber' },
      { status: 500 }
    );
  }
}
