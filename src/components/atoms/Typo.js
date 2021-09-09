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

export const H1 = styled.h1`
  text-align: center;
  color: skyblue;
`;

export const H2 = styled.h2`
  text-align: center;
  color: skyblue;
`;
