#!/usr/bin/env node
const { Command } = require("commander");
// const fs = require("fs");
// const path = require("path");

const program = new Command();

// // utils
// const createFile = require("./utils/createFile");

// // templates
// const testTemplate = require("./templates/component-test");
// const componentTemplate = require("./templates/component");

// // get file name and location from command line
// const [fileName, fileLocation] = process.argv.slice(2);

// if (!(fileName && fileLocation)) {
//   console.error("Please provide a file name and location.");
//   process.exit(1);
// }

// const dir = path.join(__dirname, fileLocation);

// // create directory if it doesn't exist
// if (!fs.existsSync(fileLocation)) {
//   console.log(__dirname);
//   console.log(dir);
//   fs.mkdirSync(dir, { recursive: true });
// }

// // create component file
// const componentFile = path.join(__dirname, fileLocation, `${fileName}.jsx`);
// createFile(componentFile, componentTemplate(fileName));

// // create test file
// const testFile = path.join(__dirname, fileLocation, `${fileName}.test.jsx`);
// createFile(testFile, testTemplate(fileName));

// create Module
program
  .name("react-cli")
  .version("0.0.1")
  .description("Create React Application project files and folders")
  
program
  .command("generate ")
  .description("Generate a React folder")
  // .argument("<name>", "Name of the folder to generate") // <destination>
  // .option("-g, --generate", "Generate a file or folder <name>")
  // .option("-f, --folder", "Generate a folder")
  .option("-c, --component <name>", "Generate a component ")
  .option("-m, --module", "Generate a model")
  // .option("-t, --test", "Generate a test")
  // .option("-r, --route", "Generate a route")
  // .option("-p, --page", "Generate a page")
  // .option("-s, --service", "Generate a service")
  // .option("-a, --api", "Generate an api")
  // .option("-l, --layout", "Generate a layout")
  // .option("-d, --data", "Generate a data file")
  // .option("-u, --utils", "Generate a utils file")
  // .option("-i, --interface", "Generate an interface")
  // .option("-e, --enum", "Generate an enum")
  // .option("-n, --name", "Name of the folder to generate")
  // .argument("name", "Name of the folder to generate")
  // .action((name, destination, options) => {
  .action((options) => {
    // console.log(`Generate ${name} in ${destination.component}`);
    if (options.component) {
      console.log("component")
    }
    if (options.module) {
      console.log("module")
    }
    
    switch (options) {
      case options.component:
        console.log("component")
        break;
      case options.module:
        console.log("module")
        break;
      default:
        console.log("default")
        break;
    }
  });

  program.parse();