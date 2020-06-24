import React from 'react';

import { Container } from './styles';

interface TooltipPros {
  title: string;
  className?: string;
}

const Tooltipo: React.FC<TooltipPros> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltipo;
