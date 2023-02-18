const routeTemplate = (component, pathName) => {
  return `import { ${component} } from '@pages/${component}';

export default {
  ${pathName}: {
    path: '/${pathName}',
    displayName: '${component}',
    element: <${component} />,
  } 
}
`;
}

module.exports = routeTemplate;