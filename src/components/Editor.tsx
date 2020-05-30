import React from "react";

import { ControlledEditor } from "@monaco-editor/react";

export interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  // @ts-ignore
  const handleOnChange = (ev, value?: string) => {
    value && onChange && onChange(value);
  };

  return (
    <>
      <ControlledEditor
        height="100%"
        language="javascript"
        value={value}
        onChange={handleOnChange}
        theme="dark"
      />
    </>
  );
}
