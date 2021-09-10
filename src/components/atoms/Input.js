import styled, { css } from 'styled-components';

export const Input = styled.input`
  box-sizing: border-box;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  margin: 0.5em 3em;
  padding: 0.5em 1em;
  height: 3em;

  &:focus {
    pointer: click;
    outline: none;
    border: 1px solid rgba(0, 77, 187, 1);
  }

  ${(props) =>
    props.withButton &&
    css`
      width: 100%;
      margin: 0;
    `}
`;
