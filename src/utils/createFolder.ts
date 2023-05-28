import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

/**
 * 
 * @param {string} fileLocation e.g. 'src/pages'
 * @param {string?} folder e.g. 'components'
 */
const createFolder = (fileLocation: string, folder = "") => {
  const dir = path.join(fileLocation, folder);
 
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  console.log(chalk.green(`-d ${folder} folder successfully created at ${fileLocation}`))
}

export default createFolder;
