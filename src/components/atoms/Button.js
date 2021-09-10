import styled, { css, keyframes } from 'styled-components';
import { theme } from './Theme';

export const Button = styled.button`
  background: transparent;
  border-radius: 1em;
  border-style: none;
  color: black;
  margin: 0.5em 3em;
  padding: 0.5em 1em;
  box-shadow: ${theme.shadow};
  height: 2.5em;

  &:hover {
    transition: all 0.3s ease;
    background: ${theme.mainColor};
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
      background: ${theme.mainColor};
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

  ${(props) =>
    props.small &&
    css`
      margin: 0;
      height: fit-content;
    `}

  ${(props) =>
    props.relative &&
    css`
      margin: 0;
      padding: 0;
      position: relative;
      top: ${props.top || '0'};
      left: ${props.left || '0'};
    `}
`;
