import styled, { css } from 'styled-components';

export const Button = styled.button`
  background: transparent;
  border-radius: 1em;
  border-style: none;
  color: black;
  margin: 0 1em;
  padding: 0.5em 1em;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);

  &:hover {
    background: skyblue;
    color: white;
  }

  ${(props) =>
    props.primary &&
    css`
      background: skyblue;
      color: white;
      &:hover {
        background: purple;
      }
    `}
`;
