import { Editor } from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetsStore";
import { twMerge } from "tailwind-merge";
import { desktopDir, join } from "@tauri-apps/api/path";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import toast from "react-hot-toast";
import { FiTrash, FiX } from "react-icons/fi";

interface Props {
  snippetName: string;
}

const SnippetItem = ({ snippetName }: Props) => {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet
  );
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const removeSnippetName = useSnippetStore((state) => state.removeSnippetName);

  const handleDelete = async (snippetName: string) => {
    const accept = await window.confirm("Estas seguro de eliminar?");

    if(!accept) return;

    const desktopPath = await desktopDir();
    const filePath = await join(desktopPath, "taurifiles", `${snippetName}`);
    await removeFile(filePath);
    removeSnippetName(snippetName);

    toast.success("Snippet deleted!", {
        duration: 2000,
        position: "top-right",
        style: { background: "#202020", color: "#FFF" },
      });
  }

  return (
    <div
      className={twMerge(
        "py-2 px-2 hover:bg-neutral-900 hover:cursor-pointer flex justify-between",
        selectedSnippet?.name === snippetName ? "bg-sky-500" : ""
      )}
      onClick={async () => {
        const desktopPath = await desktopDir();
        const filePath = await join(desktopPath, 'taurifiles', `${snippetName}`);
        const snippet = await readTextFile(filePath);
        setSelectedSnippet({ name: snippetName, code: snippet });
      }}
    >
      <h1>{snippetName}</h1>
      <div className="flex gap-2 items-center justify-center">
        <FiTrash className="text-neutral-500" onClick={(e) => {
            e.stopPropagation();
            handleDelete(snippetName);
        }}/>
        <FiX className="text-neutral-500" onClick={(e) => {
            e.stopPropagation();
            setSelectedSnippet(null);
        }}/>
      </div>
    </div>
  );
};

export default SnippetItem;
