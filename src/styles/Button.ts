import styled from '@emotion/styled';

export const Button = styled.button`
  background: #00d2ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #3a7bd5,
    #00d2ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #3a7bd5,
    #00d2ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.75em 1em 0.75em 1em;
  font-size: 1.15em;
  transition: transform 0.18s ease-in-out;
  cursor: pointer;
  letter-spacing: 0.05em;
  border: none;
  outline: none;

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:active {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }
`;
