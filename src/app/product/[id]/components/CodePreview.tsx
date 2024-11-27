"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Importa el tema

interface CodePreviewProps {
  jsx: string;
  css?: string;
}

export function CodePreview({ jsx, css }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Aplica el resaltado de sintaxis después de renderizar
  useEffect(() => {
    hljs.highlightAll(); // Resalta todo el contenido <code>
  }, [jsx, css]);

  return (
    <Tabs defaultValue="jsx" className="w-full col-span-7">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="jsx">JSX</TabsTrigger>
          {css && <TabsTrigger value="css">CSS</TabsTrigger>}
        </TabsList>
        <Button onClick={() => copyToClipboard(jsx)} variant="outline" size="sm">
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <TabsContent value="jsx">
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code className="language-javascript">{jsx}</code>
        </pre>
      </TabsContent>
      {css && (
        <TabsContent value="css">
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code className="language-css">{css}</code>
          </pre>
        </TabsContent>
      )}
    </Tabs>
  );
}
