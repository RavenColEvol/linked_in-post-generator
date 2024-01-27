import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, RadioChangeEvent, Select, Upload } from "antd";
import { ChangeEvent, useState } from "react";
import { IColor } from "../../App";
import { useFormState } from "../../hooks/stateContext";

function ContentForm() {
  const [form, setFormState] = useFormState()!;
  const { slides, selectedIdx } = form;
  const { title, text } = slides[selectedIdx];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.id;
    setFormState((form) => {
      const newState = { ...form };
      //@ts-ignore
      newState.slides[selectedIdx][targetName] = e.target.value as string;
      return newState;
    });
  };

  return (
    <>
      <Form.Item label="Title" name="title">
        <Input
          onChange={handleChange}
          defaultValue={title}
          type="text"
          placeholder="Your Title"
        />
      </Form.Item>
      <Form.Item label="Content" name="text">
        <Input
          onChange={handleChange}
          defaultValue={text}
          type="text"
          placeholder="Your content goes here"
        />
      </Form.Item>
    </>
  );
}

function SettingsForm() {
  return (
    <>
      <Form.Item label="Headshot" name="headshot">
        <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input placeholder="Your Name" />
      </Form.Item>
      <Form.Item label="Handle" name="handle">
        <Input placeholder="Your LinkedIn Handle" />
      </Form.Item>
    </>
  );
}

function ColorBar({ color, idx }: { color: IColor; idx: number }) {
  const [,setFormState] = useFormState()!;
  const { primary, secondary, accent } = color;
  const value = [primary, secondary, accent, idx].join(":");
  const variables = {
    "--primary": primary,
    "--secondary": secondary,
    "--accent": accent,
  } as React.CSSProperties;

  const handleChange = () => {
    setFormState(form => ({
      ...form,
      theme: {
        background: form.theme.background,
        colors: color
      }
    }));
  }

  return (
    <>
      <input
        className="color-bar__input"
        id={value}
        onChange={handleChange}
        name="colors"
        type="radio"
      />
      <label
        style={variables}
        className="color-bar__label"
        htmlFor={value}
      ></label>
    </>
  );
}

function ThemeForm() {
  const [themes] = useState([
    {
      primary: "rgb(74, 79, 199)",
      secondary: "rgb(121, 123, 150)",
      accent: "rgb(255, 255, 255)",
    },
    {
      primary: "rgb(235, 84, 111)",
      secondary: "rgb(34, 2, 87)",
      accent: "rgb(255, 255, 255)",
    },
    {
      primary: "rgb(23, 61, 78)",
      secondary: "rgb(52, 175, 158)",
      accent: "rgb(225, 241, 241)",
    },
    {
      primary: "rgb(231, 76, 60)",
      secondary: "rgb(44, 62, 80)",
      accent: "rgb(242, 243, 244)",
    },
    {
      primary: "rgb(108, 133, 105)",
      secondary: "rgb(151, 165, 138)",
      accent: "rgb(247, 255, 229)",
    },
    {
      primary: "rgb(58, 166, 185)",
      secondary: "rgb(129, 163, 157)",
      accent: "rgb(246, 255, 253)",
    },
    {
      primary: "rgb(0, 28, 48)",
      secondary: "rgb(23, 107, 135)",
      accent: "rgb(245, 254, 254)",
    },
    {
      primary: "rgb(255, 102, 102)",
      secondary: "rgb(255, 137, 137)",
      accent: "rgb(255, 248, 243)",
    },
    {
      primary: "rgb(63, 35, 5)",
      secondary: "rgb(180, 174, 155)",
      accent: "rgb(245, 245, 245)",
    },
    {
      primary: "rgb(74, 85, 162)",
      secondary: "rgb(120, 149, 203)",
      accent: "rgb(236, 246, 255)",
    },
    {
      primary: "rgb(166, 62, 68)",
      secondary: "rgb(150, 109, 98)",
      accent: "rgb(253, 253, 253)",
    },
    {
      primary: "rgb(44, 59, 80)",
      secondary: "rgb(100, 140, 178)",
      accent: "rgb(243, 246, 249)",
    },
    {
      primary: "rgb(196, 122, 45)",
      secondary: "rgb(123, 153, 127)",
      accent: "rgb(253, 251, 239)",
    },
    {
      primary: "rgb(78, 156, 106)",
      secondary: "rgb(238, 165, 60)",
      accent: "rgb(249, 244, 235)",
    },
    {
      primary: "rgb(109, 29, 84)",
      secondary: "rgb(166, 62, 109)",
      accent: "rgb(248, 244, 248)",
    },
    {
      primary: "rgb(166, 114, 57)",
      secondary: "rgb(91, 119, 107)",
      accent: "rgb(254, 249, 242)",
    },
    {
      primary: "rgb(44, 72, 104)",
      secondary: "rgb(74, 137, 193)",
      accent: "rgb(245, 249, 253)",
    },
    {
      primary: "rgb(140, 98, 102)",
      secondary: "rgb(216, 161, 141)",
      accent: "rgb(250, 247, 247)",
    },
    {
      primary: "rgb(138, 40, 42)",
      secondary: "rgb(194, 75, 77)",
      accent: "rgb(253, 249, 249)",
    },
    {
      primary: "rgb(60, 53, 80)",
      secondary: "rgb(125, 138, 176)",
      accent: "rgb(247, 247, 251)",
    },
    {
      primary: "rgb(142, 110, 30)",
      secondary: "rgb(199, 165, 66)",
      accent: "rgb(250, 248, 236)",
    },
    {
      primary: "rgb(179, 40, 36)",
      secondary: "rgb(82, 101, 111)",
      accent: "rgb(248, 249, 250)",
    },
    {
      primary: "rgb(60, 30, 79)",
      secondary: "rgb(150, 88, 161)",
      accent: "rgb(247, 242, 250)",
    },
    {
      primary: "rgb(122, 60, 56)",
      secondary: "rgb(185, 130, 123)",
      accent: "rgb(255, 245, 245)",
    },
  ]);
  return (
    <>
      <Form.Item label="Background" name="background">
        <Select options={[]} />
      </Form.Item>
      <div className="color-bar__container">
        {themes.map((theme, idx) => (
          <ColorBar color={theme} idx={idx} key={idx} />
        ))}
      </div>
    </>
  );
}

export { ContentForm, SettingsForm, ThemeForm };
