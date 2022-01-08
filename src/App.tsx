import React, {FunctionComponent, useRef, useState} from "react";
import {Editor} from "./components";
import {Template, TemplateDictionary} from "./.templates/function";
import data from "./.templates/data.json";
import {Column, Container} from "./App.style";

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

function itemCounter(array: object): string {
    if (Array.isArray(array)) {
        return `Length: ${array.length} items.`;
    }
    return ''
}

const App: FunctionComponent<{}> = () => {
    const [raw, setRaw] = useState(JSON.stringify(data, null, 2));
    const [fn, setFn] = useState(TemplateDictionary.default);
    const formRef = useRef<HTMLFormElement>(null)
    function onSelectChange () {
        const form = formRef.current
        const formData = new FormData(form as HTMLFormElement)
        setFn(TemplateDictionary[formData.get('template') as Template])
    }
    const result = analyze(fn, raw);


    return (
        <Container>
            <Column className="editors">
                <form ref={formRef}>
                    <label htmlFor="template">Select template: </label>
                    <select title="Template" onChange={onSelectChange} name="template">
                        <option selected
                                value={Template.MAP}>{Template.MAP}</option>
                        <option
                            value={Template.FILTER}>{Template.FILTER}</option>
                        <option
                            value={Template.REDUCE}>{Template.REDUCE}</option>
                    </select>
                </form>
                <Editor value={fn} onChange={setFn}/>
                <Editor value={raw} onChange={setRaw}/>
            </Column>
            <Column className="result">
                <div>{result && itemCounter(result)}</div>
                <pre>
          <code className="language-js">{JSON.stringify(result, null, 2)}</code>
        </pre>
            </Column>
        </Container>
    );
};

export default App;
