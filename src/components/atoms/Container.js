import styled, { css } from 'styled-components';
import { theme } from './Theme';

export const Container = styled.div`
  ${(props) =>
    props.background &&
    css`
      height: fit-content;
    `}
`;

export const FlexBox = styled.div`
  display: flex;
  flex: auto;

  ${(props) =>
    props.wrapper &&
    css`
      flex-direction: column;
      width: 100%;
    `}

  ${(props) =>
    props.middle &&
    css`
      background: white;
      border-width: 0px;
      box-shadow: ${theme.shadow};
      border-radius: 1em;
      margin: 0.5em;
      padding: 1em 0.5em;
      align-self: center;
      width: 50%;
      flex-direction: ${props.direction || 'row'};
    `}

  ${(props) =>
    props.right &&
    css`
      justify-content: right;
      flex-direction: ${props.direction || 'row'};
    `}
`;
