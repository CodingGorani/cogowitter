import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${(props) =>
    props.background &&
    css`
      height: 100vh;
    `}
`;

export const FlexBox = styled.div`
  display: flex;
  flex: auto;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.borderColor || 'black'};

  ${(props) =>
    props.wrapper &&
    css`
      flex-direction: column;
      width: 100%;
    `}

  ${(props) =>
    props.middle &&
    css`
      align-self: center;
      width: 50%;
      flex-direction: ${props.direction || 'row'};
    `}

  ${(props) =>
    props.right &&
    css`
      justify-content: right;
    `}
`;
