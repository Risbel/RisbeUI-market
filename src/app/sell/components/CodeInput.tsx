"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/atom-one-dark.css";

// Register the languages you want to use
hljs.registerLanguage("javascript", javascript);

const CodeInput: React.FC = () => {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  const highlightWithLineNumbers = (input: string) => hljs.highlight(input, { language: "javascript" }).value;

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={highlightWithLineNumbers}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
        }}
        className="hljs"
      />
    </div>
  );
};

export default CodeInput;
