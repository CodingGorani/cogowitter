import styled, { css } from 'styled-components';
import { theme } from './Theme';

export const Span = styled.span`
  text-align: ${(props) => props.align || 'center'};
  margin: ${(props) => props.margin || '0'};
  font-size: ${(props) => props.fontSize || '1em'};

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
  color: ${theme.mainColor};
`;

export const H2 = styled.h2`
  text-align: center;
  color: skyblue;
  margin: 0.5em 3em;
  padding: 0.5em 0;
  border-top: 0.5px solid ${theme.mainColor};
`;
