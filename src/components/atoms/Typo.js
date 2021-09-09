import styled, { css } from 'styled-components';

export const Span = styled.span`
  text-align: ${(props) => props.align || 'center'};

  ${(props) =>
    props.nameTag &&
    css`
      position: relative;
      top: 5px;
      left: 5px;
    `}

  ${(props) =>
    props.bold &&
    css`
      font-weight: bold;
    `}
`;
