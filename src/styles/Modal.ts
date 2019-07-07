import styled from '@emotion/styled';

export const Modal = styled.div`
  width: 100%;
  width: 100vw;
  max-width: 40em;
  margin-left: 20px;
  margin-right: 20px;
  top: 50%;
  left: 50%;
  background-color: #fff;
  border-radius: 8px;
  z-index: 100;
  position: absolute;
  transform: translate(-50%, -50%);
`;

export const ModalBackdrop = styled.div`
  z-index: 80;
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;
