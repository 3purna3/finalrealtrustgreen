import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// GET all projects
export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST create a new project
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | '';
    const imageSource = formData.get('imageSource') as 'file' | 'url';

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let imageUrlToSave = '';

    // Check image source
    if (imageSource === 'url') {
      if (!imageUrl || !imageUrl.trim()) {
        return NextResponse.json(
          { error: 'Please enter a valid image URL' },
          { status: 400 }
        );
      }
      imageUrlToSave = imageUrl.trim();
    } else if (imageSource === 'file' && image) {
      // Convert image to buffer
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = image.name.replace(/\s+/g, '-');
      const filename = `project-${timestamp}-${originalName}`;

      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
      await writeFile(path.join(uploadDir, filename), buffer);

      // Crop image to 450x350 (bonus feature)
      const croppedFilename = `project-${timestamp}-cropped.jpg`;
      const croppedPath = path.join(uploadDir, croppedFilename);

      await sharp(buffer)
        .resize(450, 350, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({ quality: 85 })
        .toFile(croppedPath);

      imageUrlToSave = `/uploads/projects/${croppedFilename}`;
    }

    const project = await db.project.create({
      data: {
        name,
        description,
        imageUrl: imageUrlToSave,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
