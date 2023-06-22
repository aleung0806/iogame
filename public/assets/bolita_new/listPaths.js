const fs = require('fs');
const path = require('path');

const directoryPath = './'; // Replace with the actual directory path

function getAllFilePaths(directoryPath) {
  const fileNames = fs.readdirSync(directoryPath);

  const filePaths = fileNames.reduce((acc, fileName) => {
    const filePath = path.join(directoryPath, fileName);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      return acc.concat(getAllFilePaths(filePath)); // Recursive call for subdirectories
    } else if (path.extname(fileName).toLowerCase() === '.png') {
      return acc.concat(filePath);
    }

    return acc;
  }, []);

  return filePaths;
}

const pngFilePaths = getAllFilePaths(directoryPath);
const outputPath = 'list.json'; // Replace with the desired output file path

fs.writeFileSync(outputPath, JSON.stringify(pngFilePaths, null, 2));

console.log(`PNG file paths have been written to ${outputPath}.`);
