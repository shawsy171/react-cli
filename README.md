# React cli
This is a cli to create React files and folders

## idea
Using React as a templating engine

# Usage

Default files will be created in demo files

## Create component

```
ts-node src/index.ts generate -c <component-file-name> -l <location>

rtc generate -c happy
```

## Create module
When creating a module the module name and page name can be the same but the component (`-c`) in the page  must have a different name

e.g.
```
ts-node src/index.ts generate -m findings -p findings -c findingsComponent     
```

```
ts-node src/index.ts generate -m <module-name> -l <location> -p <page-name> -c <component-name>
```
Or

The module will require a page name `-p <page-name>` use camalCase for page names
```
npm run module generate -- -m <module-name> -l <location> -p <paga-name>
```

this got `rtc` working as a command
```
sudo npm link
```
