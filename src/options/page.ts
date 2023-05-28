import path from "path";
import fs from "fs";

import { PENTEST_MANAGER_LOCATION } from "../constants";
import pageTemplate from "../templates/page";
import capitalize from "../utils/capitalize";
import createFile from "../utils/createFile";
import createFolder from "../utils/createFolder";
import routeTemplate from "../templates/route";

/**
 * Create a page
 * @param pageName this will be the name of the page
 * @param moduleName this will be the name of the module the page belongs to
 */
export default class CreatePage {
  pageName: string;
  moduleName: string;
  projectRoutesPath = path.join(PENTEST_MANAGER_LOCATION + "/src/routes/routes.tsx");

  constructor(pageName: string, moduleName: string) {
    this.pageName = pageName;
    this.moduleName = moduleName;
  }

  createRoute() {
    const routeLocation = path.join(
      PENTEST_MANAGER_LOCATION + "/src/modules",
      this.moduleName,
      "routes",
      `${this.pageName}.tsx`
    );
    createFile(routeLocation, routeTemplate(this.pageName, this.pageName));
  }

    /**
   * Add the route to the routes.tsx file
   *  - import the route
   * - add the route to the routes array
   */
    addRouteToRoutes() {

      // const filePath = path.join(PENTEST_MANAGER_LOCATION + "/src/routes/routes.tsx");
      const searchLine = 'export const mainRoute: RouteObject = {';
      const newLine = `import ${this.pageName}Routes from '@modules/${this.moduleName}/routes/${this.pageName}';`;
  
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
      const newLine = `  ...${this.pageName}Routes,`;
    
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

  /**
   * init
   * - create the page folder
   * - create the page file
   * - add the route to the routes.tsx file
   * - add the route to the routes object
   */
  init () {
    this.createRoute()
    createFolder(PENTEST_MANAGER_LOCATION + "/src/", "pages")

    const pageLocation = path.join(
      PENTEST_MANAGER_LOCATION + "/src/pages",
      `${capitalize(this.pageName)}.tsx`
    );

    createFile(pageLocation, pageTemplate(this.pageName, this.moduleName))

    this.addRouteToRoutes()
    this.addRouteToRouteObject()

  }
}