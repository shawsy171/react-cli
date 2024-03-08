import capitalize from "../utils/capitalize";

const queriesTemplate = (moduleName: string) => {
  const capModuleName = capitalize(moduleName);
  return `import queryClient from '@common/clients/queryClient';
  import { get${capModuleName}, get${capModuleName}ByEngagement } from '@/modules/${moduleName}/services/${moduleName}Service';
  import { useMutation, useQuery } from '@tanstack/react-query';
  import { AWSError } from '@common/api/errors';

  // GET ALL
  export const useGet${capModuleName}byTaskId = (taskId: string) =>
    useQuery({
      queryKey: ['${moduleName}', taskId],
      queryFn: () => get${capModuleName}(taskId),
    });

  // GET ONE
  export const useGetAll${capModuleName} = (engagementId: string) =>
    useQuery({
      queryKey: ['tasks', engagementId],
      queryFn: async () => {
        const ${moduleName} = await get${capModuleName}ByEngagement(engagementId)

        // AWSError
        if (${moduleName} && 'code' in ${moduleName}) {
          throw new Error(\`\${${moduleName}.code} \${${moduleName}.message}\`);
        }

        // standard Error
        if (${moduleName} instanceof Error) {
          throw new Error(${moduleName}.message);
        }
        return ${moduleName};
      },
    });

  // PUT
  export const useUpdate${moduleName} = (taskId: string, engagementId: string) => {
    return useMutation({
      mutationFn: update${capModuleName},
      mutationKey: ['update-${moduleName}', taskId],
      onSuccess: () => {
      // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        queryClient.invalidateQueries({ queryKey: ['tasks', engagementId]})
      },
      onError: (error) => {
        if (error instanceof AWSError) {
          throw new AWSError(error.message, error);
        }

        if (error instanceof Error) {
          throw new Error(error.message);
        }
      },
    });

  };

  // POST
  export const useCreate${moduleName} = ({ parentTaskId, engagementId }: CreateTask) => {
    return useMutation({
      mutationFn: create${capModuleName},
      mutationKey: ['create-${moduleName}'],
      onSuccess: (data) => {
      // Invalidate and refetch
        if (parentTaskId) {
          queryClient.invalidateQueries({ queryKey: ['task', parentTaskId] })
        }
        if (engagementId) {
          queryClient.invalidateQueries({ queryKey: ['tasks', engagementId] })
        }
      },
      onError: (error) => {
        if (error instanceof AWSError) {
          throw new AWSError(error.code +' $%$ '+ error.message, error);
        }

        if (error instanceof Error) {
          throw new Error(error.message);
        }
      },
    });

    // DELETE
    export const useDelete${moduleName} = ({ parentTaskId, engagementId }: DeleteTask) => {
      return useMutation({
        mutationFn: delete${capModuleName},
        mutationKey: ['delete-${moduleName}'],
        onSuccess: async () => {
        // Invalidate and refetch
          if (parentTaskId) {
            await queryClient.invalidateQueries({ queryKey: ['task', parentTaskId] })
          }
          if (engagementId) {
            await queryClient.invalidateQueries({ queryKey: ['tasks', engagementId] })
          }
        },
        onError: (error) => {
          if (error instanceof AWSError) {
            throw new AWSError(error.code +' $%$ '+ error.message, error);
          }

          if (error instanceof Error) {
            throw new Error(error.message);
          }
        },
      });
  }}
`;
};

export default queriesTemplate;
