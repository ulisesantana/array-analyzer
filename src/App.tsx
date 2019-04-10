import React, {FunctionComponent} from 'react';
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: ${window.innerHeight}px;
  padding: 0;
  margin: 0;
  width: ${window.innerWidth}px;
`;

const App: FunctionComponent<{}> = () => {

  return <Container>

  </Container>;
};

export default App;
