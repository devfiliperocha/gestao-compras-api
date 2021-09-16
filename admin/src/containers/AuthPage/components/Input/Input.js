import styled from 'styled-components';
import { Inputs as Base } from '@buffetjs/custom';

const Input = styled(Base)`
  input{
    &:focus{
    border-color: ${({ theme }) => theme.main.colors.primary};

  }
  }
`;


export default Input;
