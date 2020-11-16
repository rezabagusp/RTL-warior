import {
  cleanup,
} from '@testing-library/react';

/*
 * Test cases will consist of:
 * 1. Should render into the DOM
 * 2. Click input bar should render dropdown list
 * 3. On dropwdown open should listen arrow top & bottom
 * 4. On select should hide dropdown
 * 4.1 Select by click
 * 4.2 Select by key enter
 */

afterEach(cleanup);

describe.only('Select Option Component Test', () => {
  test('1. Should render into DOM', () => {
    expect(true).toBe(true);
  });
});
