import path from "path";
import fs from "fs";

import { PENTEST_MANAGER_LOCATION } from "../constants";
import pageTemplate from "../templates/page";
import capitalize from "../utils/capitalize";
import createFile from "../utils/createFile";
import createFolder from "../utils/createFolder";
import routeTemplate from "../templates/route";
import serviceTemplate from "../templates/services";
/**
 * Create a service
 * @param fileName this will be the file name of the service
 * @param moduleName this will be the name of the module the service belongs to
 */
export default class CreateService {
  moduleName: string;
  fileName: string;
  projectRoutesPath = path.join(PENTEST_MANAGER_LOCATION + "/src/routes/routes.tsx");

  constructor(moduleName: string, fileName: string) {
    if (!moduleName) {
      throw new Error("Please provide a module name");
    }
    if (!fileName) {
      throw new Error("Please provide a file name");
    }
    this.moduleName = moduleName;
    this.fileName = fileName;
  }

  createServiceFile() {
    const serviceLocation = path.join(
      PENTEST_MANAGER_LOCATION + "/src/modules",
      this.moduleName,
      "services",
      `${this.fileName}.service.ts` // -- using .service.ts might make this a nicer experience
      // `${this.fileName}.ts`
    );
    createFile(serviceLocation, serviceTemplate(this.moduleName));
  }


  /**
   * init
   * - create the service folder
   * - create the service file
   */
  init () {
    this.createServiceFile();

  }
}