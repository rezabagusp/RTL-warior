import React from 'react';
import {
  cleanup,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Option } from '../../types';
import SelectOption, { Props as SelectOptionProps } from './index';

/*
 * Test cases will consist of:
 * 1. Should render into the DOM
 * 2. Click input bar should render dropdown list with the right length
 * 3. On dropwdown open, click item should call the onSelect prop and remove the dropdown
 */

const onSelectMock = jest.fn();

const DATA_MOCK: Option[] = [
  {
    id: 1,
    name: 'BWM',
  },
  {
    id: 2,
    name: 'Ferrari',
  },
  {
    id: 3,
    name: 'Lamborghini',
  },
  {
    id: 4,
    name: 'Ford',
  },
];

const props: SelectOptionProps = {
  data: DATA_MOCK,
  selected: null,
  placeholder: 'Select your favorite car',
  onSelect: onSelectMock,
};

const utils = (selectOptionProps: SelectOptionProps) => {
  const renderResult: RenderResult = render(
    <SelectOption {...selectOptionProps} />,
  );

  const getSelectOptonEl = (): HTMLElement => renderResult.getByTestId('selectOption');
  const getSelectOptionListEl = () => renderResult.getByTestId('selectOption-list');

  return {
    ...renderResult,
    getSelectOptonEl,
    getSelectOptionListEl,
  };
};

afterEach(cleanup);

describe('Select Option Component Test', () => {
  test('1. Should render into DOM', () => {
    const {
      getSelectOptonEl,
    } = utils(props);

    // user should see the button
    expect(getSelectOptonEl()).toBeInTheDocument();
  });

  test('2. Click input bar should render dropdown list', async () => {
    const {
      getSelectOptonEl,
      getSelectOptionListEl,
      getByTestId,
    } = utils(props);

    // user click the submit button
    userEvent.click(getSelectOptonEl());

    // wait for list appearance
    await waitFor(() => {
      expect(getByTestId('selectOption-list')).toBeInTheDocument();
    });

    // expect list has 4 items
    expect(getSelectOptionListEl().querySelectorAll('.selectOption-listItem').length).toEqual(4);
  });

  test('3. On dropwdown open, click item should call the onSelect prop and remove the dropdown', async () => {
    const {
      getSelectOptonEl,
      getSelectOptionListEl,
      // debug,
    } = utils(props);

    // user click the submit button
    userEvent.click(getSelectOptonEl());

    // wait for list appearance
    await waitFor(() => {
      expect(getSelectOptionListEl()).toBeInTheDocument();
    });

    const firstItem = getSelectOptionListEl().querySelectorAll('.selectOption-listItem')[1];
    userEvent.click(firstItem);
    expect(props.onSelect).toHaveBeenCalled();
  });
});
