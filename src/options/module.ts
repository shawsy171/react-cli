import { Command } from "commander";
import * as path from "path";
import chalk from "chalk";
import capitalize from "../utils/capitalize";
import fs from "fs";

// templates
import createFile from "../utils/createFile";
import createFolder from "../utils/createFolder";
import componentTemplate from "../templates/component";
import testTemplate from "../templates/component-test";
import pageTemplate from "../templates/page";
import queryTemplate from "../templates/queries";

import routeTemplate from "./../templates/route";
import { PENTEST_MANAGER_LOCATION } from "../constants";

export default class CreateModule {
  COMPONENTS = "components";
  ROUTES = "routes";
  SERVICES = "services";
  PAGES = "pages";
  QUERIES = "queries"
  projectRoutesPath = path.join(PENTEST_MANAGER_LOCATION + "/src/routes/routes.tsx");
  ext = "tsx";

  moduleName: string;
  location: string;
  componentName: string;
  dir: string;
  pageName: string;

  constructor(moduleName = "", pageName = "", location = "/demo", componentName = "") {
    this.moduleName = moduleName;
    this.pageName = pageName;
    this.location = location;
    this.componentName = componentName;
    this.dir = path.join(PENTEST_MANAGER_LOCATION + "/src/modules", moduleName);
  }

  createFolder() {
    createFolder(this.dir, this.COMPONENTS);
    createFolder(this.dir, this.ROUTES);
    createFolder(this.dir, this.SERVICES);
    createFolder(PENTEST_MANAGER_LOCATION + "/src/", this.PAGES);
    createFolder(this.dir, this.QUERIES);
  }

  createPageComponent() {
    const pageLocation = path.join(
      PENTEST_MANAGER_LOCATION + "/src/pages",
      `${capitalize(this.pageName)}.${this.ext}`
    );
    createFile(pageLocation, pageTemplate(this.pageName, this.moduleName));
  }

  createComponent() {
    const componentLocation = path.join(
      this.dir,
      this.COMPONENTS,
      `${capitalize(this.componentName)}.${this.ext}`
    );
    const componentTestLocation = path.join(
      this.dir,
      this.COMPONENTS,
      `${capitalize(this.componentName)}.spec.${this.ext}`
    );
    createFile(componentLocation, componentTemplate(this.moduleName));
    createFile(componentTestLocation, testTemplate(this.moduleName));

  }

  createRoute() {
    const routeLocation = path.join(
      this.dir,
      this.ROUTES,
      `${this.pageName}.${this.ext}`
    );
    createFile(routeLocation, routeTemplate(this.pageName, this.pageName));
  }

  createQuery() {
    const routeLocation = path.join(
      this.dir,
      this.QUERIES,
      `${this.pageName.toLowerCase()}Queries.${this.ext}`
    );
    createFile(routeLocation, queryTemplate(this.moduleName));
  }

  /**
   * Add the route to the routes.tsx file
   *  - import the route
   * - add the route to the routes array
   */
  addRouteToRoutes() {

    // const filePath = path.join(PENTEST_MANAGER_LOCATION + "/src/routes/routes.tsx");
    const searchLine = 'export const mainRoute: RouteObject = {';
    const newLine = `import ${this.moduleName}Routes from '@modules/${this.moduleName}/routes/${this.pageName}';`;

    // Read the file
    fs.readFile(this.projectRoutesPath, 'utf-8', (err, fileData) => {
      if (err) {
        console.error(err);
        return;
      }
      
      // Find the index of the search line
      const searchLineIndex = fileData.indexOf(searchLine);
      if (searchLineIndex === -1) {
        console.log(`Line "${searchLine}" not found in the file.`);
        return;
      }

      // Insert the new line before the search line
      const modifiedFileData = fileData.slice(0, searchLineIndex-1) + newLine + '\n' + fileData.slice(searchLineIndex-1);

      // Write the modified data back to the file
      fs.writeFile(this.projectRoutesPath, modifiedFileData, 'utf-8', (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Line inserted successfully!');
      });
    });
  }

  /**
   * Add the route to the routes.tsx file
   * - add the route to the routes object
   */
  addRouteToRouteObject() {
    const searchObject = `export const routes = {`;
    const newLine = `  ...${this.moduleName}Routes,`;
  
    try {
      // Read the file
      const fileData = fs.readFileSync(this.projectRoutesPath, 'utf-8');
  
      // Find the index of the search object
      const searchObjectIndex = fileData.indexOf(searchObject);
      if (searchObjectIndex === -1) {
        console.log(`Object "${searchObject}" not found in the file.`);
        return;
      }
  
      // Find the end index of the search object
      const searchObjectEndIndex = fileData.indexOf('};', searchObjectIndex) + 2;
      if (searchObjectEndIndex === -1) {
        console.log(`End of object not found.`);
        return;
      }
  
      // Insert the new line at the end of the object
      const fileEnd = fileData.slice(searchObjectEndIndex - 2);
      const modifiedFileData =
        fileData.slice(0, searchObjectEndIndex - 2) +
        newLine +
        '\n' +
        fileEnd;
  
      // Write the modified data back to the file
      fs.writeFileSync(this.projectRoutesPath, modifiedFileData, 'utf-8');
      console.log('New route line inserted successfully into object!');
    } catch (err) {
      console.error(err);
    }
  }
  

  module() {
    this.createFolder();
    this.createComponent();
    this.createRoute();
    this.createPageComponent();
    this.createQuery();
    this.addRouteToRoutes();
    this.addRouteToRouteObject();
  }
}
