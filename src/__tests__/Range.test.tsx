import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Range from '../components/Range';

describe('Range Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Range component ussing [min, max]', () => {
    const { container } = render(
      <Range initialMin={0} initialMax={100} step={1} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Range component ussing the allowedValues', () => {
    const { container } = render(
      <Range allowedValues={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});