import { ReactNode } from 'react';

interface WrapperProps {
  className?: string;
  children: ReactNode;
}

const Wrapper = ({ className = '', children }: WrapperProps) => {
  return <div className={`wrapper ${className}`}>{children}</div>;
};

export { Wrapper };
