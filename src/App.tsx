import { v4 } from "uuid";
import { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { FormStateProvider } from "./hooks/stateContext";
import { BACKGROUNDS } from "./constants";
import { Form } from "antd";

export interface ISlide {
  uid: string;
  title: string;
  text?: string;
}

export interface IColor {
  primary: string;
  secondary: string;
  accent: string;
}

export type Backgrounds = (typeof BACKGROUNDS)[number];

export interface State {
  selectedIdx: number;
  user: {
    headshot: string;
    name: string;
    handle: string;
  };
  theme: {
    background: Backgrounds;
    colors: IColor;
  };
  slides: ISlide[];
}

function App() {
  const [state, setState] = useState<State>({
    selectedIdx: 0,
    user: {
      headshot: "",
      name: "Ravi Lamkoti",
      handle: "ravilamkoti",
    },
    theme: {
      background: "dots",
      colors: {
        primary: "#EB546F",
        secondary: "#220257",
        accent: "#FFFFFF",
      },
    },
    slides: [
      {
        uid: v4(),
        title: "GROW YOUR LINKEDIN",
        text: "Cover slide Subtitle",
      },
      {
        uid: v4(),
        title: "GROW YOUR LINKEDIN",
        text: "Cover slide Subtitle",
      },
      {
        uid: v4(),
        title: "GROW YOUR LINKEDIN",
        text: "Cover slide Subtitle",
      },
      {
        uid: v4(),
        title: "GROW YOUR LINKEDIN",
        text: "Cover slide Subtitle",
      },
      {
        uid: v4(),
        title: "GROW YOUR LINKEDIN",
        text: "Cover slide Subtitle",
      },
      {
        uid: v4(),
        title: "GROW YOUR LINKEDIN",
        text: "Cover slide Subtitle",
      },
    ],
  });
  const [form] = Form.useForm();

  useEffect(() => {
    const content = state.slides[state.selectedIdx]
    if (!content) return;
    const { text, title } = content;
    form.setFieldsValue({
      title,
      text
    })
  }, [state.selectedIdx, state.slides])

  return (
    <FormStateProvider value={[state, setState]}>
      <Form layout="vertical" form={form}>
        <main>
          <Editor />
          <Preview />
        </main>
      </Form>
    </FormStateProvider>
  );
}

export default App;
