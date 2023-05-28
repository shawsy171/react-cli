import capitalize from "../utils/capitalize";

const routeTemplate = (pageName: string, pathName: string) => {
  return `import ${capitalize(pageName)} from '@pages/${capitalize(pageName)}';
import useBreadcrumbs from '@common/hooks/useBreadCrumbs';

export default {
  ${pathName}: {
    path: '/${pathName}',
    displayName: '${pageName}',
    element: <${capitalize(pageName)} />,
    breadcrumbs: () => {
      useBreadcrumbs([{ text: '${capitalize(pageName)}', href: '/${capitalize(pageName)}' }], []);
    },
  }
}
`;
}

export default routeTemplate;
