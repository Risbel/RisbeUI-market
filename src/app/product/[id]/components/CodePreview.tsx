"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

interface CodePreviewProps {
  codeData: Record<string, string>; // dinámico con claves como `jsx`, `tsx`, `css`
}

export function CodePreview({ codeData }: CodePreviewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(Object.keys(codeData)[0]); // Controla la pestaña activa
  const codeRef = useRef<HTMLElement | null>(null); // Referencia para el bloque de código actual

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current); // Resalta el bloque de código actual
    }
  }, [activeTab]); // Ejecuta el resaltado cada vez que cambia la pestaña activa

  const tabs = Object.keys(codeData);

  return (
    <Tabs defaultValue={tabs[0]} className="w-full" onValueChange={setActiveTab}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          {tabs.map((key) => (
            <TabsTrigger key={key} value={key}>
              {key.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button onClick={() => copyToClipboard(codeData[activeTab], activeTab)} variant="outline" size="sm">
          {copiedKey === activeTab ? "Copied!" : `Copy ${activeTab.toUpperCase()}`}
        </Button>
      </div>
      {tabs.map((key) => (
        <TabsContent key={key} value={key}>
          <pre className="bg-muted rounded-md overflow-x-auto">
            <code
              ref={key === activeTab ? codeRef : null} // Asigna la referencia solo a la pestaña activa
              className={`language-${key === "css" ? "css" : "javascript"}`}
            >
              {codeData[key]}
            </code>
          </pre>
          <div className="mt-2 flex justify-end">
            <Button onClick={() => copyToClipboard(codeData[key], key)} variant="outline" size="sm">
              {copiedKey === key ? "Copied!" : `Copy ${key.toUpperCase()}`}
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
