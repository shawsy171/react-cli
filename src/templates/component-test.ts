const testTemplate = (componentName: string) => {
  return `import React from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    const { getByText } = render(<${componentName} />);
    expect(getByText('${componentName} component')).toBeInTheDocument();
  });
});
`;
};

export default testTemplate;
