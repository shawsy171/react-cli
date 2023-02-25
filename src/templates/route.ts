import capitalize from "../utils/capitalize";

const routeTemplate = (component: string, pathName: string) => {
  return `import { ${component} } from '@pages/${component}';

export default {
  ${pathName}: {
    path: '/${pathName}',
    displayName: '${component}',
    element: <${capitalize(component)} />,
  } 
}
`;
}

export default routeTemplate;