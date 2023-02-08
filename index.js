#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const [fileName, fileLocation] = process.argv.slice(2);

if (!(fileName && fileLocation)) {
  console.error("Please provide a file name and location.");
  process.exit(1);
}
const dir = path.join(__dirname, fileLocation);

const componentFile = path.join(__dirname,fileLocation, `${fileName}.js`);
const testFile = path.join(__dirname, fileLocation, `${fileName}.test.js`);

const componentTemplate = `import React from 'react';

const ${fileName} = () => {
  return (
    <div>
      ${fileName} component
    </div>
  );
};

export default ${fileName};
`;

const testTemplate = `import React from 'react';
import { render } from '@testing-library/react';
import ${fileName} from './${fileName}';

describe('${fileName}', () => {
  it('renders correctly', () => {
    const { getByText } = render(<${fileName} />);
    expect(getByText('${fileName} component')).toBeInTheDocument();
  });
});
`;


if (!fs.existsSync(fileLocation)) {
  console.log(__dirname);
  console.log(dir);
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFile(componentFile, componentTemplate, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`${componentFile} created.`);
});

fs.writeFile(testFile, testTemplate, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`${testFile} created.`);
});
