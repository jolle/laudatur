import styled from '@emotion/styled';

export const FormTable = styled.table`
  width: 100%;

  tr td:first-child {
    text-align: right;
    width: 1%;
    white-space: nowrap;
    padding-right: 1em;
  }

  @media (max-width: 670px) {
    tr td:first-child {
      white-space: normal;
    }
  }
`;
