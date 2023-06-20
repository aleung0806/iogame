const fs = require('fs');
const path = require('path');

const directoryPath = './';

function findPNGFiles(directory) {
  const files = fs.readdirSync(directory);
  const pngFiles = [];

  files.forEach((file) => {
    const filePath = path.join(directory, file);

    // Check if the file is a directory
    if (fs.statSync(filePath).isDirectory()) {
      const nestedFiles = findPNGFiles(filePath);
      if (nestedFiles.length > 0) {
        const subdirectory = file;
        pngFiles.push({ [subdirectory]: nestedFiles });
      }
    } else {
      // Check if the file is a PNG
      if (path.extname(file) === '.png') {
        pngFiles.push(file);
      }
    }
  });

  return pngFiles;
}

const directoryObject = {};

// Recursively find PNG files in the directory
const pngFiles = findPNGFiles(directoryPath);

// Store path names in nested objects reflecting the directory structure
pngFiles.forEach((file) => {
  if (typeof file === 'string') {
    const filePath = file;
    const directoryName = path.dirname(filePath);
    const fileName = path.basename(filePath);
    if (!directoryObject[directoryName]) {
      directoryObject[directoryName] = {};
    }
    directoryObject[directoryName][fileName] = filePath;
  } else {
    const subdirectory = Object.keys(file)[0];
    const nestedFiles = file[subdirectory];
    directoryObject[subdirectory] = nestedFiles;
  }
});

console.log(directoryObject);

// Convert the directoryObject to JSON
const jsonOutput = JSON.stringify(directoryObject, null, 2);

// Save the JSON to a file
const outputFilePath = './map.json';
fs.writeFileSync(outputFilePath, jsonOutput);

console.log('JSON output saved to:', outputFilePath);