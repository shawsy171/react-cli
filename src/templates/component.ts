import capitalize from "../utils/capitalize";

const componentTemplate = (componentName: string) => {
  return `import React from 'react';

const ${componentName} = () => {
  return (
    <div>
      ${componentName} component
    </div>
  );
};

export default ${componentName};
`;
};

export default componentTemplate;
