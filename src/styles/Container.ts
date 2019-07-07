import styled from '@emotion/styled';

export const Container = styled.div`
  width: auto;
  height: calc(100% - 2em);
  @media (min-width: 576px) {
    max-width: 576px;
  }
  @media (min-width: 768px) {
    max-width: 768px;
  }
  @media (min-width: 992px) {
    max-width: 992px;
  }
  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;
