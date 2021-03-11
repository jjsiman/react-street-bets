import React from 'react';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filled: boolean
}

const Button = (props: ButtonProps) => {
  const { filled, ...buttonProps } = props;

  const classes = ['Button', filled ? 'FilledButton' : 'PlainTextButton'];
  return (
    <button {...buttonProps } className={classes.join(' ')}>{props.children}</button>
  );
}

Button.defaultProps = {
  filled: false
}

export default Button;