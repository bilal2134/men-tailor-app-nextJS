// src/app/api/bills/[filename]/route.js
import { promises as fs } from 'fs';
import path from 'path';

const billsDir = path.join(process.cwd(), 'bills');

export async function GET(request, { params }) {
  const { filename } = params;
  const filepath = path.join(billsDir, filename);

  try {
    const content = await fs.readFile(filepath, 'utf-8');
    const data = JSON.parse(content);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching bill:', error);
    return new Response(JSON.stringify({ message: 'Bill not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request, { params }) {
  const { filename } = params;
  const filepath = path.join(billsDir, filename);

  try {
    const data = await request.json();
    await fs.writeFile(filepath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Bill updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating bill:', error);
    return new Response(JSON.stringify({ message: 'Failed to update bill' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, { params }) {
  const { filename } = params;
  const filepath = path.join(billsDir, filename);

  try {
    await fs.unlink(filepath);
    return new Response(JSON.stringify({ message: 'Bill deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting bill:', error);
    return new Response(JSON.stringify({ message: 'Failed to delete bill' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}