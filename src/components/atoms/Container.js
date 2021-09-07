import styled, { css } from 'styled-components';

export const Container = styled.div`
  flex: auto;
  ${(props) => {
    props.column &&
      css`
        flex-direction: column;
      `;
  }}
`;
