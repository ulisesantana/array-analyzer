import React, {ChangeEvent, ChangeEventHandler, FunctionComponent, useState, SetStateAction, Dispatch} from 'react';
import styled from "styled-components";
import {TextArea} from "./components";
import fnTemplate from './.templates/function';
import data from './.templates/data.json';


const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  flex-direction: row;
  height: ${window.innerHeight}px;
  padding: 0;
  margin: 0;
  width: ${window.innerWidth}px;
  
  & > :first-child {
    display: grid;
    grid-template-rows: 1fr 2fr;
  }
  & > :last-child {
    display: grid;
    grid-template-rows: 1fr;
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
    const data = JSON.parse(rawData);
    if (Array.isArray(data)) {
      try {
        let f = (data: any[]) => data;
        eval(`f = ${fn}`);
        return f(data);
      } catch {
        return data;
      }
    } else {
      return [];
    }
  } catch (e) {
    return [];
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
        <TextArea spellCheck={false} value={raw} onChange={rawHandler}/>
      </Column>
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
    </Container>
  );
};

export default App;

