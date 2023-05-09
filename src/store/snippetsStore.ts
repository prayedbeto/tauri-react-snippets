import { create } from "zustand";

interface Snippet {
  name: string;
  code: string | null;
}

interface SnippetState {
  snippetsName: string[];
  selectedSnippet: Snippet | null;
  addSnippetName: (name: string) => void;
  setSnippetNames: (names: string[]) => void;
  setSelectedSnippet: (snippet: Snippet|null) => void;
  removeSnippetName: (name: string) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsName: [],
  selectedSnippet: null,
  addSnippetName: (name) =>
    set((state) => ({
      snippetsName: [...state.snippetsName, name],
    })),
  setSnippetNames: (names) => set({ snippetsName: names }),
  setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
  removeSnippetName: (name) => 
    set((state) => ({
      snippetsName: state.snippetsName.filter(item => item !== name),
    })),
}));
