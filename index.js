#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// utils
const createFile = require("./utils/createFile");

// templates
const testTemplate = require("./templates/component-test");
const componentTemplate = require("./templates/component");

// get file name and location from command line
const [fileName, fileLocation] = process.argv.slice(2);

if (!(fileName && fileLocation)) {
  console.error("Please provide a file name and location.");
  process.exit(1);
}

const dir = path.join(__dirname, fileLocation);

// create directory if it doesn't exist
if (!fs.existsSync(fileLocation)) {
  console.log(__dirname);
  console.log(dir);
  fs.mkdirSync(dir, { recursive: true });
}

// create component file
const componentFile = path.join(__dirname, fileLocation, `${fileName}.jsx`);
createFile(componentFile, componentTemplate(fileName));

// create test file
const testFile = path.join(__dirname, fileLocation, `${fileName}.test.jsx`);
createFile(testFile, testTemplate(fileName));

// create Module

