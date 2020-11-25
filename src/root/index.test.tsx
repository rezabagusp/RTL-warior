import React from 'react';
import {
  cleanup,
  render,
  RenderResult,
} from '@testing-library/react';
import App from './App';

/*
 * Test cases will consist of:
 * 1. Title & Form should render into DOM ✅
 * 2. When there is no car selected, user unable to submit
 * 3. When there is car selected, user able to submit
 */

const utils = () => {
  const view: RenderResult = render(
    <App />,
  );

  const getFormTitleEl = (): HTMLElement => view.getByTestId('formTitle');
  const getFormEl = (): HTMLElement => view.getByTestId('form');

  return {
    ...view,
    getFormEl,
    getFormTitleEl,
  };
};

afterEach(cleanup);

describe.only('App Screen Test', () => {
  test('1. Title & Form should render into DOM', () => {
    const {
      getFormEl,
      getFormTitleEl,
      debug,
    } = utils();

    debug();
    // user should see the form title
    expect(getFormEl()).toBeInTheDocument();
    // user should see the form
    expect(getFormTitleEl()).toBeInTheDocument();
  });
});
