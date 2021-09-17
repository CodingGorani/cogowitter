import styled, { css } from 'styled-components';
import { theme } from './Theme';

export const Button = styled.button`
  box-sizing: border-box;
  background: transparent;
  border-radius: ${(props) => props.borderRadius || '1em'};
  border-style: none;
  color: ${(props) => props.color || 'black'};
  margin: ${(props) => props.margin || '0.5em 3em'};
  padding: ${(props) => props.padding || '0.5em 1em'};
  box-shadow: ${theme.shadow};

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
