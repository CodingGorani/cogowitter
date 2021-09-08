import styled, { css } from 'styled-components';

export const Input = styled.input`
  box-sizing: border-box;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  padding: 0.5em 1em;

  &:focus {
    outline: none;
    border: 1px solid rgba(0, 77, 187, 1);
  }
`;
