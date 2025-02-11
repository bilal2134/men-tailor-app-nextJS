// src/app/api/measurements/route.js
import { promises as fs } from "fs";
import path from "path";

const measurementsDir = path.join(process.cwd(), "measurements");

export async function GET() {
  try {
    const files = await fs.readdir(measurementsDir);
    const measurements = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(
          path.join(measurementsDir, file),
          "utf-8"
        );
        return JSON.parse(content);
      })
    );
    return new Response(JSON.stringify(measurements), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching measurements:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch measurements" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
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

    // Retrieve existing measurement files
    const files = await fs.readdir(measurementsDir);

    // Find the highest existing serial number
    const serialNumbers = files.map((file) =>
      parseInt(file.match(/\d+/)?.[0] || "0", 10)
    );
    let serialNumber = serialNumbers.length
      ? Math.max(...serialNumbers) + 1
      : 1;

    // Ensure unique filename
    let filename = `measurement_${serialNumber}.json`;
    let filepath = path.join(measurementsDir, filename);

    while (files.includes(filename)) {
      serialNumber++;
      filename = `measurement_${serialNumber}.json`;
      filepath = path.join(measurementsDir, filename);
    }

    // Assign the final serial number
    data.serialNumber = serialNumber.toString();

    // Write the data to the JSON file
    await fs.writeFile(filepath, JSON.stringify(data, null, 2));

    return new Response(
      JSON.stringify({
        message: "Measurement saved successfully",
        serialNumber: data.serialNumber,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving measurement:", error);
    return new Response(
      JSON.stringify({ message: "Failed to save measurement" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
