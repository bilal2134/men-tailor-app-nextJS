// src/app/api/measurements/[filename]/route.js
import { promises as fs } from 'fs';
import path from 'path';

const measurementsDir = path.join(process.cwd(), 'measurements');

export async function GET(request, { params }) {
  const { filename } = params;
  const filepath = path.join(measurementsDir, filename);

  try {
    const content = await fs.readFile(filepath, 'utf-8');
    const data = JSON.parse(content);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching measurement:', error);
    return new Response(JSON.stringify({ message: 'Measurement not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request, { params }) {
  const { filename } = params;
  const filepath = path.join(measurementsDir, filename);

  try {
    const data = await request.json();
    await fs.writeFile(filepath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Measurement updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating measurement:', error);
    return new Response(JSON.stringify({ message: 'Failed to update measurement' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, { params }) {
  const { filename } = params;
  const filepath = path.join(measurementsDir, filename);

  try {
    await fs.unlink(filepath);
    return new Response(JSON.stringify({ message: 'Measurement deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting measurement:', error);
    return new Response(JSON.stringify({ message: 'Failed to delete measurement' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}