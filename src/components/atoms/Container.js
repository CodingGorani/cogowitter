import styled, { css } from 'styled-components';
import { theme } from './Theme';

export const Container = styled.div`
  ${(props) =>
    props.background &&
    css`
      min-height: 100vh;
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
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 100%;
  max-width: 300px;
  margin: 0.5em 0;
`;
