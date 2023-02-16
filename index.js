#!/usr/bin/env node
const { Command } = require("commander");
// const chalk = require("chalk");
const path = require("path");

const program = new Command();
const log = console.log;

// utils
const createFile = require("./utils/createFile");
const createFolder = require("./utils/createFolder");

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
  .option("-l, --location <location>", "Set location")
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
    // config
    const defaultLocation = "./demo";
    const location = options.location || defaultLocation;

    if (options.component) {
      
      const fileName = options.component;
      // const dir = path.join(__dirname, location);

      // create directory if it doesn't exist
      createFolder(location, 'components');
      
      console.log(`creating ${fileName} at ${location}/components`)

      // create component file      
      const componentTemplate = require("./templates/component");
      const componentFile = path.join(__dirname, location, 'components', `${fileName}.jsx`);
      createFile(componentFile, componentTemplate(fileName));

      // create test file
      const testTemplate = require("./templates/component-test");
      const testFile = path.join(__dirname, location, 'components', `${fileName}.test.jsx`);
      createFile(testFile, testTemplate(fileName));
      console.log(`${fileName} successfully created at ${location}`);
      // console.log(chalk.green(`${fileName} successfully created at ${location}`));
    }

    if (options.module) {
      console.log("module")
      createFolder(location, 'components');
      createFolder(location, 'components');
    }

  });

  program.parse();