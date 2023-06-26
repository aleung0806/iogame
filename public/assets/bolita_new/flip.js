const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDirectory = './jump/right';
const outputDirectory = './jump/left';

fs.readdir(sourceDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const sourcePath = path.join(sourceDirectory, file);

    // Check if the file is a PNG
    if (path.extname(file) === '.png') {
      const outputFilePath = path.join(outputDirectory, file);

      sharp(sourcePath)
        .flop() // Flip vertically
        .toFile(outputFilePath, (err) => {
          if (err) {
            console.error('Error flipping image:', err);
          } else {
            console.log(`Image "${file}" flipped vertically and saved to "${outputFilePath}"`);
          }
        });
    }
  });
});