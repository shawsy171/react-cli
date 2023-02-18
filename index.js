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
  .option("-m, --module <module>", "Generate a model")
  .option("-l, --location <location>", "Set location")
  // .option("-t, --test", "Generate a test")
  // .option("-r, --route", "Generate a route")
  .option("-p, --page <pageName>", "Generate a page")
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
      const componentFile = path.join(__dirname, location, 'components', `${fileName}.tsx`);
      createFile(componentFile, componentTemplate(fileName));

      // create test file
      const testTemplate = require("./templates/component-test");
      const testFile = path.join(__dirname, location, 'components', `${fileName}.test.tsx`);
      createFile(testFile, testTemplate(fileName));
      console.log(`${fileName} successfully created at ${location}`);
      // console.log(chalk.green(`${fileName} successfully created at ${location}`));
    }

    if (options.module) {
      const moduleName = options.module;
      console.log("module name: ", moduleName)

      const COMPONENTS = 'components';
      const ROUTES = 'routes';
      const SERVICES = 'services';
      const ext = '.tsx';

      // process.cwd()
      // module location
      const dir = path.join(location, moduleName);
      console.log(dir)
      
      /**
       * create components folder 
       */
      createFolder(dir, COMPONENTS);

      // create component file
      const componentTemplate = require("./templates/component");
      const componentFileLocation = path.join(dir, COMPONENTS, `${moduleName}.tsx`);
      createFile(componentFileLocation, componentTemplate(moduleName));

      // create test file
      const testTemplate = require("./templates/component-test");
      const testFileLocation = path.join(dir, COMPONENTS, `${moduleName}.test.tsx`);
      createFile(testFileLocation, testTemplate(moduleName));

      /**
       * create routes folder
       */
      createFolder(dir, ROUTES);
      const routeTemplate = require("./templates/route");
      const routeLocation = path.join(dir, ROUTES, `${moduleName.toLowerCase()}.tsx`);
      createFile(routeLocation, routeTemplate(moduleName, moduleName));


      createFolder(dir, 'queries');
      createFolder(dir, SERVICES);
      createFolder(dir, 'types');
    }

    if (options.page) {
      const fileName = options.page;
      // const dir = path.join(__dirname, location);

      // create directory if it doesn't exist
      createFolder(location, 'pages');
      
      console.log(`creating ${fileName} at ${location}/pages`)

      // create component file      
      const pageTemplate = require("./templates/page");
      const pageFile = path.join(__dirname, location, 'pages', `${fileName}.tsx`); // change to tsx
      createFile(pageFile, pageTemplate(fileName));

      // create test file
      // const testTemplate = require("./templates/page-test");
      // const testFile = path.join(__dirname, location, 'pages', `${fileName}.test.tsx`);
      // createFile(testFile, testTemplate(fileName));
      // console.log(`${fileName} successfully created at ${location}`);
    }
    

  });

  program.parse();