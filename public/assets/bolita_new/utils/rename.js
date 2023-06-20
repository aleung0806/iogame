const fs = require('fs');
const path = require('path');

const directoryPath = './';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // Check if the file is a PNG
    if (path.extname(file) === '.png') {
      const match = file.match(/(\d+)/); // Match the number in the filename

      if (match) {
        const number = match[0];
        const newFileName = `${number}.png`; // Create a new filename

        fs.rename(filePath, path.join(directoryPath, newFileName), (err) => {
          if (err) {
            console.error('Error renaming file:', err);
          } else {
            console.log(`File "${file}" renamed to "${newFileName}"`);
          }
        });
      }
    }
  });
});