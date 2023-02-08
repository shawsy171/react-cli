import React from 'react';
import { render } from '@testing-library/react';
import testFile from './testFile';

describe('testFile', () => {
  it('renders correctly', () => {
    const { getByText } = render(<testFile />);
    expect(getByText('testFile component')).toBeInTheDocument();
  });
});
