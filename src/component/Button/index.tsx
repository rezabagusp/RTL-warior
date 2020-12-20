import React, {
  FunctionComponent,
  ReactNode,
  MouseEvent,
} from 'react';
import cls from 'classnames';
import './index.scss';

export type Props = {
  type?: 'primary' | 'secondary' | 'outline' | 'light-outline',
  id?: string,
  className?: string,
  disabled?: boolean,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  children: ReactNode,
};

const Button: FunctionComponent<Props> = (
  {
    type,
    id,
    className,
    disabled,
    onClick,
    children,
  },
) => {
  const baseClasses: { [key: string]: string } = {
    btnPrimary: 'button--primary',
    btnSecondary: 'button--secondary',
    btnOutline: 'button--outline',
    btnDisabled: 'button--disabled',
  };

  const propsClass: { [key: string]: boolean | undefined } = {
    [baseClasses.btnPrimary]: type === 'primary',
    [baseClasses.btnSecondary]: type === 'secondary',
    [baseClasses.btnOutline]: type === 'outline',
    [baseClasses.btnDisabled]: disabled,
  };

  const buttonClass = cls(
    'button',
    propsClass,
    className,
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (disabled) {
      return;
    }

    onClick(e);
  };

  return (
    <button
      id={id}
      className={buttonClass}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  type: 'primary',
  disabled: false,
};

export default Button;
