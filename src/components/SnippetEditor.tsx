import { Editor } from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetsStore";
import { useEffect, useState } from "react";
import { desktopDir } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";
import { TfiPencil } from "react-icons/tfi";

const SnippetEditor = () => {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const [text, setText] = useState<string | undefined>("");

  useEffect(() => {
    if (!selectedSnippet) {
      return;
    }

    const saveText = setTimeout(async () => {
      const desktopPath = await desktopDir();
      writeTextFile(
        `${desktopPath}/taurifiles/${selectedSnippet.name}`,
        text ?? ""
      );
      console.log("saved!");
    }, 1000);

    return () => {
      clearTimeout(saveText);
    };
  }, [text]);

  return (
    <>
      {selectedSnippet ? (
        <Editor
          theme="vs-dark"
          defaultLanguage="javascript"
          options={{ fontSize: 14 }}
          onChange={(value) => setText(value)}
          value={selectedSnippet.code ?? ""}
        />
      ) : (
        <TfiPencil className="text-9xl text-neutral-500"/>
      )}
    </>
  );
};

export default SnippetEditor;
