import capitalize from "../utils/capitalize";

const componentTemplate = (fileName: string) => {
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
`;
};

export default componentTemplate;
