const fs = require('fs');
const path = require('path');


const directories = ['./']
const pngs = []


while (directories.length > 0){
  root = directories.pop()
  let files = fs.readdirSync(root)
  files.forEach((file) => {
    const filePath = path.join(root, file);

    if (fs.statSync(filePath).isDirectory()) {
      directories.push(filePath)
    } else {
      if (path.extname(file) === '.png') {
        pngs.push(filePath);
      }
    }
  })
}

const map = {}

pngs.forEach(path => {
  let splitPath = path.split('/')

  let level = map
  for (let segment of splitPath){
    if (segment.includes('.png') ){
      if (!('files' in level)){
        level.files = []
      }
      
      level.files.push(path)
      
    }else{
      if (!(segment in level)){
        level[segment] = {}
      }
    }
    level = level[segment]
  }
})


function flattenFiles(obj) {
  for (const key in obj) {
    if (obj[key].hasOwnProperty("files")) {
      obj[key] = obj[key]["files"];
    } else if (typeof obj[key] === "object") {
      flattenFiles(obj[key]);
    }
  }
}
flattenFiles(map);
fs.writeFileSync('assetList.json', JSON.stringify(pngs, null, 2));
fs.writeFileSync('assetMap.json', JSON.stringify(map, null, 2));

