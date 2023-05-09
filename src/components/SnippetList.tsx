import { readDir, writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useEffect, useState } from "react";
import { useSnippetStore } from "../store/snippetsStore";
import SnippetItem from "./SnippetItem";

const SnippetList = () => {
  const setSnippetNames = useSnippetStore((state) => state.setSnippetNames);
  const snippetsName = useSnippetStore((state) => state.snippetsName);

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const results = await readDir(`${desktopPath}taurifiles`);
      console.log(results);
      const filenames = results.map((file) => file.name!);
      setSnippetNames(filenames);
    }
    loadFiles();
  }, []);

  return (
    <div>
      {snippetsName.map((snippet) => (
        <SnippetItem snippetName={snippet} key={`snippet-${snippet}`} />
      ))}
    </div>
  );
};

export default SnippetList;
