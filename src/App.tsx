import React, {ChangeEvent, ChangeEventHandler, FunctionComponent, useState, SetStateAction, Dispatch} from 'react';
import styled from "styled-components";
import {TextArea} from "./components";
import fnTemplate from './.templates/function';
import data from './.templates/data.json';


const Container = styled.main`
  display: flex;
  flex-direction: row;
  height: ${window.innerHeight}px;
  padding: 0;
  margin: 0;
  width: ${window.innerWidth}px;
  
  & > :first-child {
    max-width: 400px;
    min-width: 300px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
      
    & > :first-child {
      height: calc(${window.innerHeight}px / 2);
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  width: 100%;
  overflow: auto;
`;

function analyze(fn: string, data: string) {
  try {
    let f = (data: string) => data;
    eval(`f = ${fn}`);
    return f(JSON.parse(data));
  } catch {
    return JSON.parse(data)
  }
}

function useHandler([state, setter]: [string, Dispatch<SetStateAction<string>>]): [string, ChangeEventHandler<HTMLTextAreaElement>] {
  return [
    state,
    ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
      setter(value);
    }
  ];
}

function itemCounter(array: any[]) {
  return `Length: ${array.length} items.`;
}

const App: FunctionComponent<{}> = () => {
  const [raw, rawHandler] = useHandler(useState(JSON.stringify(data, null, 2)));
  const [fn, fnHandler] = useHandler(useState(fnTemplate));
  const result = analyze(fn, raw);

  return (
    <Container>
      <Column>
        <TextArea spellCheck={false} value={fn} onChange={fnHandler}/>
      </Column>
      <Column>
        <TextArea spellCheck={false} value={raw} onChange={rawHandler}/>
        <Column>
          <div>
            {result && itemCounter(result)}
          </div>
          <pre>
            <code>
            {JSON.stringify(result, null, 2)}
            </code>
          </pre>
        </Column>
      </Column>
    </Container>
  );
};

export default App;

