import styled from 'styled-components';
import { Button as Base } from '@buffetjs/core';

const Button = styled(Base)`
  width: 100%;
  text-transform: ${({ textTransform }) => textTransform};
  background-color: ${({ theme }) => theme.main.colors.primary};
  border-color: ${({ theme }) => theme.main.colors.primary};
`;

Button.defaultProps = {
  color: 'primary',
  type: 'button',
  textTransform: 'none',
};

export default Button;
