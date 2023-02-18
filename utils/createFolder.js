const fs = require("fs");
const path = require("path");

/**
 * 
 * @param {string} fileLocation e.g. 'src/pages'
 * @param {string?} folder e.g. 'components'
 */
const createFolder = (fileLocation, folder = "") => {
  const dir = path.join(process.cwd(), fileLocation, folder);
  
  if (!fs.existsSync(dir)) {
    console.log(dir)


    fs.mkdirSync(dir, { recursive: true });
  }
}

module.exports = createFolder;
