import { Command } from "commander";
import * as path from "path";
import chalk from "chalk";
import CreateComponent from "./component";
import createFile from "../utils/createFile";
import createFolder from "../utils/createFolder";

// templates
import routeTemplate from "./../templates/route";

export default class CreateModule {
  COMPONENTS = "components";
  ROUTES = "routes";
  SERVICES = "services";
  ext = "tsx";
  moduleName: string;
  location: string;
  dir: string;

  constructor(moduleName = "", location = "./demo") {
    this.moduleName = moduleName;
    this.location = location;
    this.dir = path.join(location, moduleName);
  }

  createFolder() {
    createFolder(this.dir, this.COMPONENTS);
    createFolder(this.dir, this.ROUTES);
    createFolder(this.dir, this.SERVICES);
  }

  createComponent() {
    const create = new CreateComponent(this.moduleName, this.dir);
    create.file();
    // create.testFile();
  }

  createRoute() {
    const routeLocation = path.join(
      this.dir,
      this.ROUTES,
      `${this.moduleName.toLowerCase()}.${this.ext}`
    );
    createFile(routeLocation, routeTemplate(this.moduleName, this.moduleName));
  }

  module () {
    this.createFolder();
    this.createComponent();
    this.createRoute();
  }
}

//   const moduleName = options.module;
//   console.log("module name: ", moduleName)

// const COMPONENTS = 'components';
// const ROUTES = 'routes';
// const SERVICES = 'services';
// const ext = '.tsx';

//   // process.cwd()
//   // module location
//   const dir = path.join(location, moduleName);
//   console.log(dir)

//   /**
//    * create components folder
//    */
//   createFolder(dir, COMPONENTS);

//   // create component file
//   const componentTemplate = require("./templates/component");
//   const componentFileLocation = path.join(dir, COMPONENTS, `${moduleName}.tsx`);
//   createFile(componentFileLocation, componentTemplate(moduleName));

//   // create test file
//   const testTemplate = require("./templates/component-test");
//   const testFileLocation = path.join(dir, COMPONENTS, `${moduleName}.test.tsx`);
//   createFile(testFileLocation, testTemplate(moduleName));

//   /**
//    * create routes folder
//    */
//   createFolder(dir, ROUTES);
//   const routeTemplate = require("./templates/route");
//   const routeLocation = path.join(dir, ROUTES, `${moduleName.toLowerCase()}.tsx`);
//   createFile(routeLocation, routeTemplate(moduleName, moduleName));

//   createFolder(dir, 'queries');
//   createFolder(dir, SERVICES);
//   createFolder(dir, 'types');
// }

// if (options.page) {
//   const fileName = options.page;
//   // const dir = path.join(__dirname, location);

//   // create directory if it doesn't exist
//   createFolder(location, 'pages');

//   console.log(`creating ${fileName} at ${location}/pages`)

//   // create component file
//   const pageTemplate = require("./templates/page");
//   const pageFile = path.join(__dirname, location, 'pages', `${fileName}.tsx`); // change to tsx
//   createFile(pageFile, pageTemplate(fileName));

//   // create test file
//   // const testTemplate = require("./templates/page-test");
//   // const testFile = path.join(__dirname, location, 'pages', `${fileName}.test.tsx`);
//   // createFile(testFile, testTemplate(fileName));
//   // console.log(`${fileName} successfully created at ${location}`);
