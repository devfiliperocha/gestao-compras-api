import styled from 'styled-components';

const LeftMenuListLink = styled.div`
  max-height: ${({ theme }) => theme.main.sizes.leftMenu.listHeight};
  margin-bottom: 19px;
  overflow: auto;
`;

export default LeftMenuListLink;
