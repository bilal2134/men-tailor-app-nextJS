// src/app/api/bills/route.js
import { promises as fs } from 'fs';
import path from 'path';

const billsDir = path.join(process.cwd(), 'bills');

export async function GET() {
  try {
    const files = await fs.readdir(billsDir);
    const bills = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(billsDir, file), 'utf-8');
        return JSON.parse(content);
      })
    );
    return new Response(JSON.stringify(bills), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching bills:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch bills' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Ensure the directory exists
    try {
      await fs.access(billsDir);
    } catch (err) {
      await fs.mkdir(billsDir);
    }

    // Create a unique filename using bill number or a timestamp
    const filename = `bill_${data.billNumber || Date.now()}.json`;
    const filepath = path.join(billsDir, filename);

    // Write the data to the JSON file
    await fs.writeFile(filepath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Bill saved successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving bill:', error);
    return new Response(JSON.stringify({ message: 'Failed to save bill' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}