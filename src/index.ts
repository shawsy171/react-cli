#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import * as path from "path";

import CreateComponent from "./options/component";
import CreateModule from "./options/module";

const program = new Command();
const log = console.log;

program
  .name("react-cli")
  .version("0.0.1")
  .description("Create React Application project files and folders")
  
program
  .command("generate ")
  .description("Generate a React folders and files")
//   // .argument("<name>", "Name of the folder to generate") // <destination>
//   // .option("-g, --generate", "Generate a file or folder <name>")
//   // .option("-f, --folder", "Generate a folder")
  .option("-c, --component <name>", "Generate a component ")
  .option("-m, --module <module>", "Generate a model")
//   .option("-l, --location <location>", "Set location")
//   // .option("-t, --test", "Generate a test")
//   // .option("-r, --route", "Generate a route")
//   .option("-p, --page <pageName>", "Generate a page")
//   // .option("-s, --service", "Generate a service")
//   // .option("-a, --api", "Generate an api")
//   // .option("-l, --layout", "Generate a layout")
//   // .option("-d, --data", "Generate a data file")
//   // .option("-u, --utils", "Generate a utils file")
//   // .option("-i, --interface", "Generate an interface")
//   // .option("-e, --enum", "Generate an enum")
//   // .option("-n, --name", "Name of the folder to generate")
//   // .argument("name", "Name of the folder to generate")
//   // .action((name, destination, options) => {
  .action((options) => {
    log(chalk.blue("----------------------"));
    log(chalk.blue("Command: generate"));
    log(chalk.blue("----------------------"));
    
    // config
    const DEFAULT_LOCATION = "./demo";
    const location = options.location || DEFAULT_LOCATION;
    
    if (options.component) {
      log(chalk.blue("----------------------"));
      log(chalk.blue("Component: ", options.component));
      log(chalk.blue("----------------------"));

      const create = new CreateComponent(options.component, location);
      create.folder();
      create.file();
      create.testFile();
    }

    if (options.module) {
      log(chalk.blue("Module: ", options.module));
      log()
      const create = new CreateModule(options.module, location);
      create.module();
    }
  });

  program.parse();