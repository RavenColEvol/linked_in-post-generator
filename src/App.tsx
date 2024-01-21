import { useState } from "react"
import Editor from "./components/Editor"
import Preview from "./components/Preview"
import { FormStateProvider } from "./hooks/stateContext";

export interface ISlide {
  title: string;
  text?: string;
}

export interface IColor {
  primary: string;
  secondary: string;
  accent: string;
}

export type Backgrounds = 'dots' | 'circle' | 'triangle' | 'blobs';

export interface State {
  selectedIdx: number;
  user: {
    headshot: string;
    name: string;
    handle: string;
  },
  theme: {
    background: Backgrounds;
    colors: IColor
  },
  slides: ISlide[]
}

function App() {
  const [state, setState] = useState<State>({
    selectedIdx: 0,
    user: {
      headshot: '',
      name: 'Ravi Lamkoti',
      handle: 'ravilamkoti',
    },
    theme: {
      background: 'dots',
      colors: {
        primary: '#EB546F',
        secondary: '#220257',
        accent: '#FFFFFF'
      }
    },
    slides: [
      {
        title: 'GROW YOUR LINKEDIN',
        text: 'Cover slide Subtitle'
      }
    ]
  });
  
  return (
    <FormStateProvider value={[state, setState]}>
      <main>
        <Editor />
        <Preview />
      </main>
    </FormStateProvider>
  )
}

export default App
