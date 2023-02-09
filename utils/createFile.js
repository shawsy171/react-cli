const fs = require("fs");

// create file
const createFile = (fileName, fileTemplate) => {
  fs.writeFile(fileName, fileTemplate, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log(`${fileName} created.`);
  });
}
module.exports = createFile;