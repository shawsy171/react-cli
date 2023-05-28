#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

import CreateComponent from "./options/component";
import CreateModule from "./options/module";
import CreatePage from "./options/page";

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
  .option("-p, --page <pageName>", "Generate a page")
  //   // .option("-s, --service", "Generate a service")
  //   // .option("-a, --api", "Generate an api")
  .option("-f, --form <formName>", "Generate form")
  .option("-l, --location", "Generate file at this location")
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
    const DEFAULT_LOCATION = "";
    const location = options.location || DEFAULT_LOCATION;

    
    // Module
    if (options.module) {
      log(chalk.blue("Module: ", options.module));
      log()
      if (!options.page) {
        log(chalk.red("Please provide a page name"));
      } if (!options.component) {
        log(chalk.red("Please provide a component name"));
      } else {
        const create = new CreateModule(options.module, options.page, location, options.component);
        create.module();
      }
      return;

    // Component
    } else if (options.component) {
      log(chalk.blue("----------------------"));
      log(chalk.blue("Component: ", options.component));
      log(chalk.blue("----------------------"));

      const create = new CreateComponent(options.component);
      create.folder();
      create.file();
      create.testFile();
      return;
    
    // Form
    } else if (options.form) {
      log(chalk.blue("form: ", options.form));
      log()
      return;

    // Page
    } else if (options.page) {

      log(chalk.blue("page: ", options.page));
      log()
      if (!options.module) {
        log(chalk.red("Please provide a module name"));
      }
      else {
        const create = new CreatePage(options.page, options.module);
        create.init();
      }
      return;
    }

  });

program
  .command("page")
  .description("Generate a Page")
  .option("-c, --component <name>", "Generate a component ")
  .option("-m, --module <module>", "Generate a model")
  .option("-p, --page <pageName>", "Generate a page")
  .action((options) => {
    log(chalk.blue("----------------------"));
    log(chalk.blue("Command: page"));
    log(chalk.blue("----------------------"));
    log()
    console.log(program.args); 
    // config
    const DEFAULT_LOCATION = "";
    const location = options.location || DEFAULT_LOCATION;

      log(chalk.blue("page: ", options.page));

      if(!options.page) {
        log(chalk.red("Please provide a page name"));
      } else if (!options.module) {
        log(chalk.red("Please provide a module name"));
      }
      else {
        const create = new CreatePage(options.page, options.module);
        create.init();
      }
      return;
  });

program.addHelpText('after', `

Example call:
  $ custom-help --help`);
program.parse();
