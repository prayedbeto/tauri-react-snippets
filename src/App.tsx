import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Toaster } from "react-hot-toast";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import SnippetEditor from "./components/SnippetEditor";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="h-screen text-white grid grid-cols-12">
      <div className="col-span-3 bg-zinc-950">
        <SnippetForm/>
        <SnippetList/>
      </div>
      <div className="col-span-9 bg-neutral-950 flex justify-center">
        <SnippetEditor/>
      </div>
      <Toaster/>
    </div>
  );
}

export default App;
