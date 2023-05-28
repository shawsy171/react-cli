import createFolder from "../utils/createFolder";
import createFile from "../utils/createFile";
import componentTemplate from "../templates/component";
import testTemplate from "../templates/component-test";
import path from "path";
import {PENTEST_MANAGER_LOCATION} from "../constants";
class CreateComponent {
  fileName: string;
  dir: string;
  location: string;
  /**
   *
   * @param fileName name of the file to be created
   * @param location place where the file will be created
  */
 constructor(fileName = "", location = "/demo") {
   this.fileName = fileName;
   this.dir = process.cwd();
  //  this.location = path.join(this.dir, PENTEST_MANAGER_LOCATION + location, "components");
   this.location = path.join(PENTEST_MANAGER_LOCATION + location, "components");
  }
  
  folder() {
    createFolder(this.location, "components");
  }
  
  file() {
    const componentFile = path.join(this.location, `${this.fileName}.tsx`);
    createFile(componentFile, componentTemplate(this.fileName));
  }
  
  testFile() {
    const testFile = path.join(this.location, `${this.fileName}.test.tsx`);
    createFile(testFile, testTemplate(this.fileName));
  }
}

export default CreateComponent;
