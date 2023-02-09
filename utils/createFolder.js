/**
 * 
 * @param {string} fileLocation e.g. 'src/pages'
 * @param {string?} folder e.g. 'components'
 */
const createFolder = (fileLocation, folder = "") => {
  const dir = path.join(__dirname, fileLocation, folder);

  if (!fs.existsSync(dir)) {


    fs.mkdirSync(dir, { recursive: true });
  }
}

module.exports = createFolder;
