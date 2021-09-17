import styled, { css } from 'styled-components';
import { theme } from './Theme';

export const Container = styled.div`
  ${(props) =>
    props.background &&
    css`
      min-height: 100vh;
      height: fit-content;
    `}

  ${(props) =>
    props.wrapper &&
    css`
      width: 100%;
      min-height: 100vh;
    `}
`;

export const FlexBox = styled.div`
  display: flex;

  ${(props) =>
    props.wrapper &&
    css`
      flex-direction: ${props.direction || 'column'};
      margin: ${(props) => props.margin || '0'};
      padding: ${(props) => props.padding || '0'};
      width: 100%;
    `}

  ${(props) =>
    props.styled &&
    css`
      background: white;
      border-width: 0px;
      box-shadow: ${theme.shadow};
      border-radius: 1em;
      margin: ${(props) => props.margin || '0.5em'};
      padding: ${(props) => props.padding || '1em 2em'};
      flex-direction: ${props.direction || 'column'};
    `}

  ${(props) =>
    props.middle &&
    css`
      background: white;
      border-width: 0px;
      box-shadow: ${theme.shadow};
      border-radius: 1em;
      margin: ${(props) => props.margin || '0.5em'};
      padding: ${(props) => props.padding || '1em 2em'};
      align-self: center;
      width: 50%;
      height: fit-content;
      max-width: 650px;
      min-width: 300px;
      flex-direction: ${props.direction || 'row'};
    `}

  ${(props) =>
    props.right &&
    css`
      justify-content: right;
      flex-direction: ${props.direction || 'row'};
    `}

  ${(props) =>
    props.spaceBetween &&
    css`
      justify-content: space-between;
      flex-direction: ${props.direction || 'row'};
    `}
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 100%;
  max-width: 300px;
  margin: 0.5em 0;
`;
