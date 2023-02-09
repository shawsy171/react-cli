const routeTemplate = (component, pathName) => {
  return `import { ${component} } from '@pages/${component}';
  // import queryClient from '@common/clients/queryClient';
  // import { getTasks } from '../services/getTasks';
  
  // export async function ${component.toLowercase()}TasksLoader({
  //   params,
  // }: {
  //   params: { [key: string]: string };
  // }): Promise<unknown> {
  //   return queryClient.fetchQuery(['tasks', params.id], () => getTasks(params.id));
  // }
  
  export default {
    engagement: {
      path: '/${pathName}',
      displayName: '${component}',
      element: <${component} />,
      // loader: ${component.toLowercase()}TasksLoader,
    },
  };
  `;
}

module.exports = routeTemplate;