import { Button, ButtonProps } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const MTButton: React.FC<ButtonProps> = ({ children, onClick, ...rest }) => {
  return (
    <StyledButton type="button" {...{ onClick, ...rest }}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)``;

export default MTButton;
