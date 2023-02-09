const capitalize = require("../utils/capitalize");

const componentTemplate = (fileName) => {

   const capFileName = capitalize(fileName);
  return `import React from 'react';

const ${capFileName} = () => {
  return (
    <div>
      ${capFileName} component
    </div>
  );
};

export default ${capFileName};
`};

module.exports = componentTemplate;