import capitalize from "../utils/capitalize";

const testTemplate = (fileName: string) => {

  const capFileName = capitalize(fileName);

  return `import React from 'react';
import { customRender } from '@/tests/customRender';
import { render } from '@testing-library/react';
import ${capFileName} from './${capFileName}';

describe('${capFileName}', () => {
  it('renders correctly', () => {
    const { getByText } = customRender(<${capFileName} />);
    expect(getByText('${capFileName} component')).toBeInTheDocument();
  });
});
`};

export default testTemplate;
