const fs = require('fs');
const path = require('path');

function getPNGFiles(directory) {
  const pngFiles = [];
  const subdirectories = {};

  function traverseDirectory(currentDirectory) {
    const files = fs.readdirSync(currentDirectory);

    for (const file of files) {
      const filePath = path.join(currentDirectory, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        const subdirectory = path.relative(directory, filePath);
        subdirectories[subdirectory] = [];
        traverseDirectory(filePath);
      } else if (fileStat.isFile() && path.extname(file) === '.png') {
        pngFiles.push(filePath);
        const relativePath = path.relative(directory, filePath);
        const directoryName = path.dirname(relativePath);
        subdirectories[directoryName].push(relativePath);
      }
    }
  }

  traverseDirectory(directory);
  return { pngFiles, subdirectories };
}

const directory = './';
const { pngFiles, subdirectories } = getPNGFiles(directory);

// Output the paths of PNG files to list.json
fs.writeFileSync('list.json', JSON.stringify(pngFiles, null, 2));

// Output the directory structure with PNG file paths to map.json
fs.writeFileSync('map.json', JSON.stringify(subdirectories, null, 2));