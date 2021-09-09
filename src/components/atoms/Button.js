import styled, { css, keyframes } from 'styled-components';
import { theme } from './Theme';

const fadeIn = keyframes`
  from {
    padding: 0.5em 100%;
  }
  to {
    padding: 0.5em 1em;
  }
`;

export const Button = styled.button`
  text-overflow: clip;
  background: transparent;
  border-radius: 1em;
  border-style: none;
  color: black;
  margin: 0 1em;
  padding: 0.5em 1em;
  box-shadow: ${theme.shadow};

  &:hover {
    transition: all 0.3s ease;
    background: skyblue;
    color: white;
  }

  ${(props) =>
    props.noShadow &&
    css`
      box-shadow: none;
    `}

  ${(props) =>
    props.primary &&
    css`
      background: skyblue;
      color: white;
      &:hover {
        background: purple;
      }
    `}

  ${(props) =>
    props.list &&
    css`
      list-style: none;
    `}
`;
