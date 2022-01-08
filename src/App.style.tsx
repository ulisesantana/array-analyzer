import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  flex-direction: row;
  height: ${window.innerHeight}px;
  padding: 0;
  margin: 0;
  width: 100%;

  .editors {
    background-color: #202124;
    display: grid;
    grid-template-rows: 2rem 1fr 2fr;
    padding: 16px 0;
    
    form {
      align-items: center;
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0 16px 16px;
      
      label {
        color: whitesmoke;
        font-family: Consolas, serif;
        padding-right: 8px;
      }
    }
  }

  & > :last-child {
    display: grid;
    grid-template-rows: 1fr;
    padding: 16px 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    & > :first-child {
      width: 100%;
    }
  }
`;

export const Column = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  width: 100%;
  overflow: auto;

  &.result {
    grid-template-rows: 16px 1fr;
    grid-template-columns: 1fr;
    height: calc(100% - 32px);
    width: calc(100% - 32px);
    padding: 16px;
  }
`;
