// src/app/api/measurements/route.js
import { promises as fs } from 'fs';
import path from 'path';

const measurementsDir = path.join(process.cwd(), 'measurements');

export async function GET() {
  try {
    const files = await fs.readdir(measurementsDir);
    const measurements = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(measurementsDir, file), 'utf-8');
        return JSON.parse(content);
      })
    );
    return new Response(JSON.stringify(measurements), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching measurements:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch measurements' }), {
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
      await fs.access(measurementsDir);
    } catch (err) {
      await fs.mkdir(measurementsDir);
    }

    // Create a unique filename using serial number or a timestamp
    const filename = `measurement_${data.serialNumber || Date.now()}.json`;
    const filepath = path.join(measurementsDir, filename);

    // Write the data to the JSON file
    await fs.writeFile(filepath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Measurement saved successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving measurement:', error);
    return new Response(JSON.stringify({ message: 'Failed to save measurement' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}