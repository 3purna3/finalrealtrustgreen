import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import path from 'path';
import { writeFile } from 'fs/promises';
import sharp from 'sharp';

// GET all clients
export async function GET() {
  try {
    const clients = await db.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST create a new client
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const designation = formData.get('designation') as string;
    const image = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | '';
    const imageSource = formData.get('imageSource') as string | 'file'; // 'file' or 'url'

    let imageUrlToSave = '';

    // Check image source and validate
    if (imageSource === 'url') {
      if (!imageUrl || !imageUrl.trim()) {
        return NextResponse.json(
          { error: 'Please enter a valid image URL' },
          { status: 400 }
        );
      }
      imageUrlToSave = imageUrl.trim();
    } else if (imageSource === 'file') {
      if (!image || image.size === 0) {
        return NextResponse.json(
          { error: 'Please select an image file' },
          { status: 400 }
        );
      }
      
      // Handle file upload
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = image.name.replace(/\s+/g, '-');
      const filename = `client-${timestamp}-${originalName}`;

      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'clients');
      await writeFile(path.join(uploadDir, filename), buffer);

      // Crop image to 450x350 (bonus feature)
      const croppedFilename = `client-${timestamp}-cropped.jpg`;
      const croppedPath = path.join(uploadDir, croppedFilename);

      await sharp(buffer)
        .resize(450, 350, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({ quality: 85 })
        .toFile(croppedPath);

      imageUrlToSave = `/uploads/clients/${croppedFilename}`;
    } else {
      return NextResponse.json(
        { error: 'Invalid image source' },
        { status: 400 }
      );
    }

    const client = await db.client.create({
      data: {
        name,
        description,
        designation,
        imageUrl: imageUrlToSave,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}
