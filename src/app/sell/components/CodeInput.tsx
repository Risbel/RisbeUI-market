"use client";

import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";

import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-tomorrow.css";

const themes = {
  "atom-one-dark": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css",
  github: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css",
  monokai: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/monokai.min.css",
} as const;

const CodeInput = ({
  code,
  setCode,
  isDesabled,
}: {
  code: string;
  setCode: React.SetStateAction<any>;
  isDesabled?: boolean;
}) => {
  type ThemeKeys = keyof typeof themes;
  const [theme, setTheme] = useState<ThemeKeys>("atom-one-dark");

  const highlightCode = (code: string) => Prism.highlight(code, Prism.languages.jsx, "jsx");

  useEffect(() => {
    // Load the selected theme dynamically
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = themes[theme];
    link.id = "highlight-theme";

    // Remove previous theme
    const existingLink = document.getElementById("highlight-theme");
    if (existingLink) {
      document.head.removeChild(existingLink);
    }

    document.head.appendChild(link);

    return () => {
      // Cleanup: Remove the theme when the component unmounts
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [theme]);

  return (
    <div className="p-4 border rounded-lg">
      <div className="mb-4 flex flex-col max-w-40 border rounded-md ">
        <select
          value={theme}
          onChange={(e: any) => setTheme(e.target.value)}
          className="p-2 pr-2 rounded bg-gray-100 text-xs h-8 focus:outline-none"
        >
          <option value="atom-one-dark">Atom One Dark</option>
          <option value="github">GitHub</option>
          <option value="monokai">Monokai</option>
        </select>
      </div>

      <div className="overflow-hidden overflow-x-scroll">
        <Editor
          disabled={isDesabled}
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={highlightCode}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
          className="hljs border whitespace-nowrap p-4 w-full min-w-max"
        />
      </div>
    </div>
  );
};

export default CodeInput;
