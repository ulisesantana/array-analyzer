import styled from 'styled-components';

export const TextArea = styled.textarea`
  background-color: black;
  color: limegreen;
  font-size: 1rem;
  min-height: ${(window.innerHeight/2).toFixed(0)}px;
  outline: none;
  padding: 1rem;
  resize: none; 
`;