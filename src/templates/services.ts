import capitalize from "../utils/capitalize";

const servicesTemplate = (moduleName: string) => {
  const capModuleName = capitalize(moduleName);
  return `import { withCsrf } from '@/common/csrfHeader';
import {
  CreateTaskInput,
  CreateTaskOutput,
  DeleteTaskInput,
  DeleteTaskOutput,
  Get${capModuleName}Output,
  GetTasksOutput,
  UpdateTaskInput,
  UpdateTaskOutput,
} from '@amzn/pentest-manager-javascript-client/clients/pentestmanager';

import { AWSError } from '@common/api/errors';
import { getPentestManager${capModuleName}Client } from '@common/auth/midwayIdentityProvider';

const client = await getPentestManager${capModuleName}Client();

export const get${capModuleName} = async (taskId: string): Promise<Get${capModuleName}Output | undefined> => {
  const res = await client.get${capModuleName}({ taskId }).promise();
  return res;
};

export const get${capModuleName}sByEngagement = async (
  engagement: string,
): Promise<Get${capModuleName}sOutput | AWSError> => {
  try {
    // TODO: set a default value for maxResults
    const res = await client.get${capModuleName}s({ maxResults: 100, engagement }).promise();
    return res;
  } catch (err) {
    return Promise.resolve(err as AWSError);
  }
};

interface Create${capModuleName}APIInput {
  newTask: CreateTaskInput;
}

export const create${capModuleName} = async ({ newTask }: CreateTaskAPIInput) => {
  try {
    const request = client.createTask(newTask);
    const csrfReq = await withCsrf<CreateTaskOutput>(request);
    const res = await csrfReq.promise();
    return res;
  } catch (err) {
    if (err instanceof AWSError) {
      throw new AWSError(err.message, err);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const deleteTask = async ({ taskId }: DeleteTaskInput) => {
  try {
    const request = client.deleteTask({ taskId });
    const csrfReq = await withCsrf<DeleteTaskOutput>(request);
    const res = await csrfReq.promise();
    return res;
  } catch (err) {
    if (err instanceof AWSError) {
      throw new AWSError(err.message, err);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export interface UpdateTaskAPIInput {
  id: string;
  fieldToUpdate: string | keyof Omit<UpdateTaskInput, 'taskId'>;
  newValue: unknown;
}

export const updateTask = async ({
  id,
  fieldToUpdate,
  newValue,
}: UpdateTaskAPIInput): Promise<UpdateTaskOutput | undefined> => {
  try {
    const request = client.updateTask({ taskId: id, [fieldToUpdate]: newValue });
    const csrfReq = await withCsrf<UpdateTaskOutput>(request);
    const res = await csrfReq.promise();
    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message as string);
    }

    // return Promise.resolve(err as AWSError);
  }
};

`;
}

export default servicesTemplate;

