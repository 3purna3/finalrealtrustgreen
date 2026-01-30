import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all contact submissions (admin only)
export async function GET() {
  try {
    const contacts = await db.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST create a new contact submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, city } = body;

    if (!name || !email || !mobile || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const contact = await db.contact.create({
      data: {
        name,
        email,
        mobile,
        city,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}
