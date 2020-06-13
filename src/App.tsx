import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { Editor } from "./components";
import fnTemplate from "./.templates/function";
import data from "./.templates/data.json";

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  flex-direction: row;
  height: ${window.innerHeight}px;
  padding: 0;
  margin: 0;
  width: ${window.innerWidth}px;

  .editors {
    background-color: #202124;
    display: grid;
    grid-template-rows: 1fr 2fr;
    padding: 16px 0;
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

const Column = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  width: 100%;
  overflow: auto;
`;

function analyze(fn: string, rawData: string) {
  try {
    const data = Array.isArray(JSON.parse(rawData))
      ? JSON.parse(rawData)
      : [...rawData];
    let f = (data: any[]) => data;
    eval(`f = ${fn}`);
    return f(data);
  } catch (e) {
    return [];
  }
}

function itemCounter(array: any[]) {
  return `Length: ${array.length} items.`;
}

const App: FunctionComponent<{}> = () => {
  const [raw, rawHandler] = useState(JSON.stringify(data, null, 2));
  const [fn, fnHandler] = useState(fnTemplate);
  const result = analyze(fn, raw);

  return (
    <Container>
      <Column className="editors">
        <Editor value={fn} onChange={fnHandler} />
        <Editor value={raw} onChange={rawHandler} />
      </Column>
      <Column>
        <div>{result && itemCounter(result)}</div>
        <pre>
          <code className="language-js">{JSON.stringify(result, null, 2)}</code>
        </pre>
      </Column>
    </Container>
  );
};

export default App;
