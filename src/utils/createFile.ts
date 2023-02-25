import * as fs from 'fs';
import chalk from 'chalk';
/**
 * Create a file with the given template
 * @param fileName the file you want to create
 * @param fileTemplate the template you want to use
 */
const createFile = (fileName: string, fileTemplate: string) => {
  fs.writeFile(fileName, fileTemplate, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log(chalk.green(`-f ${fileName} created successfully.`));
  });
}

export default createFile;
