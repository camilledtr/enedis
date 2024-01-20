// in command line : node scripts/formatCsvToJson.js <path to csv file> <path to json file>

import fs from 'fs';

if (process.argv.length < 4) {
  console.log("Usage: node scripts/formatCsvToJson.js <path to csv file> <path to json file>");
  process.exit(1);
}

// Get the command-line arguments
const csvFile = process.argv[2];
const jsonFile = process.argv[3];

// Read the CSV file
const csv = fs.readFileSync(csvFile, 'utf8');

// Split the CSV into lines
const lines = csv.split('\n');

// Get the first line, which contains the headers
const headers = lines[0].split(',');

headers[headers.length - 1] = headers[headers.length - 1].trim();

const headerCount = headers.length;

// Remove the first line from the list of lines
lines.shift();

// Create a list for the JSON objects
const sections = [];

// Iterate over the lines
for (let i = 0; i < lines.length; i++) {
  // Create an object to store current line's data
  const section = {};

  // Get current line
  const line = lines[i].split(',');

  // Store the data from the line into the object
  for (let j = 0; j < headerCount - 1; j++) {
    section[headers[j]] = line[j];
  }

  // Store the last column separately, since it contains \r
  section[headers[headerCount - 1]] = line[headerCount - 1]?.trim();

  // Add the object to the list
  sections.push(section);
}

// Write the JSON to a file
fs.writeFileSync(jsonFile, JSON.stringify(sections, null, 2));

console.log(`Wrote ${sections.length} sections to ${jsonFile}`);