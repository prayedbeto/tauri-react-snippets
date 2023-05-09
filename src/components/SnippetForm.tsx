import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useState } from "react";
import { useSnippetStore } from "../store/snippetsStore";
import { toast } from "react-hot-toast";

const SnippetForm = () => {
  const [snippetName, setSnippetName] = useState("");
  const addSnippetName = useSnippetStore((state) => state.addSnippetName);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const desktopPath = await desktopDir();
        await writeTextFile(`${desktopPath}taurifiles/${snippetName}.js`, `{}`);
        addSnippetName(snippetName);
        setSnippetName("");
        toast.success("Snippet saved!", {
          duration: 2000,
          position: "top-right",
          style: { background: "#202020", color: "#FFF" },
        });
      }}
    >
      <input
        type="text"
        placeholder="Write a Snippet"
        className="bg-zinc-900 w-full border-none outline-none p-4"
        onChange={(e) => setSnippetName(e.target.value)}
        value={snippetName}
      />
      <button className="hidden">Save</button>
    </form>
  );
};

export default SnippetForm;
