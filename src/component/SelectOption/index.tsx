import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import cls from 'classnames';
import { Option } from '../../types';
import './index.scss';

type Props = {
  className?: string,
  data: Option[],
  selected: Option | null,
  onSelect: (newSelected: Option) => void
}

const SelectOption: FunctionComponent<Props> = ({
  className,
  data,
  selected,
  onSelect,
}) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const [showlist, setShowList] = useState<boolean>(false);
  const [cursor, setCursor] = useState<number>(0);
  const [items] = useState<Option[]>(data);

  const handleClickOutside = (e: any) => {
    const isClickOutside = wrapperRef
      && !(wrapperRef.current as unknown as HTMLElement).contains(e.target);

    if (isClickOutside) {
      setShowList(false);
    }
  };

  const handleSelectItem = (selectedItem: Option): void => {
    setShowList(false);
    onSelect(selectedItem);
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cls('selectOption', className)}
      onClick={() => {
        if (!showlist) {
          setShowList(true);
          (inputRef?.current as unknown as HTMLElement).focus();
        }
      }}
    >
      <div className="selectOption-displayWrapper">
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          value={selected?.name}
        />
      </div>
      <div className="selectOption-list">
        {renderList()}
      </div>
    </div>
  );
};

export default SelectOption;
