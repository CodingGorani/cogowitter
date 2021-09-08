import styled, { css } from 'styled-components';

export const Span = styled.span`
  text-align: ${(props) => props.align || 'center'};
  ${(props) =>
    props.bold &&
    css`
      font-weight: bold;
    `}
`;
