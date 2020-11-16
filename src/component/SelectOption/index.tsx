import React, { useState, useRef, ReactNode } from 'react';
import cls from 'classnames';
import './index.scss';

type Option = {
  id: number,
  name: string,
}

const DATA: Option[] = [
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

// TODO: handle click outside -> hide list
// handle focus remove on select item
const SelectOption = () => {
  const inputRef = useRef(null);
  const [showlist, setShowList] = useState<boolean>(false);
  const [cursor, setCursor] = useState<number>(0);
  const [items] = useState<Option[]>(DATA);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelectItem = (selectedItem: Option): void => {
    setShowList(false);
    setSelected(selectedItem);
  };

  const handleKeyDown = (e: any): void => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < items.length - 1) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 13) {
      handleSelectItem(items[cursor]);
      (inputRef?.current as unknown as HTMLElement).blur();
    }
  };

  const renderList = (): ReactNode => {
    if (!showlist) {
      return null;
    }

    return items.map((item, index) => {
      const key = `car-${item.id}`;
      const propsClas = cls(
        'selectOption-listItem',
        { 'is-active': cursor === index },
        { 'is-selected': selected && selected.id === item.id },
      );

      return (
        <div
          key={key}
          className={propsClas}
          onClick={() => handleSelectItem(item)}
        >
          { item.name }
        </div>
      );
    });
  };

  return (
    <div className="selectOption">
      <input
        ref={inputRef}
        onClick={() => {
          if (showlist) {
            setShowList(false);
            (inputRef?.current as unknown as HTMLElement).blur();
          } else setShowList(true);
        }}
        onKeyDown={handleKeyDown}
        value={selected?.name}
      />
      <div className="selectOption-list">
        {renderList()}
      </div>
    </div>
  );
};

export default SelectOption;
