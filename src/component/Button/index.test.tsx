import React from 'react';
import {
  cleanup,
  render,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button, { Props as ButtonProps } from './index';

/*
 * Test cases will consist of:
 * 1. Should render into the dom ✅
 * 2. Should listen user click ✅
 * 3. When disable, should not listen click ✅
 */

const onClickMock = jest.fn();
const buttonChildren = 'Button Text';

const defaultProps: ButtonProps = {
  onClick: onClickMock,
  children: buttonChildren,
};

const disableProps: ButtonProps = {
  onClick: onClickMock,
  disabled: true,
  children: buttonChildren,
};

const utils = (btnProps: ButtonProps) => {
  const view: RenderResult = render(
    <Button {...btnProps} />,
  );

  const getButtonEl = (): HTMLElement => view.getByText('Button Text');

  return {
    ...view,
    getButtonEl,
  };
};

afterEach(cleanup);

describe('Button Component Test', () => {
  test('1. Should render into the dom', () => {
    const {
      getButtonEl,
    } = utils(defaultProps);

    // user should see the button
    expect(getButtonEl()).toBeInTheDocument();
  });

  test('2. Should listen user click', async () => {
    const {
      getButtonEl,
    } = utils(defaultProps);

    // user click the submit button
    userEvent.click(getButtonEl());

    // assert onClick callback being called
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  test('3. When disable, should not listen click', async () => {
    const {
      getButtonEl,
    } = utils(disableProps);

    // user click the submit button
    userEvent.click(getButtonEl());

    // assert has disabled prop
    expect(disableProps.disabled).toBe(true);
    // assert onClick callback not being called
    expect(disableProps.onClick).not.toHaveBeenCalled();
  });
});
