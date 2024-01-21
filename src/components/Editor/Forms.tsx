import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import { useState } from "react";
import { IColor } from "../../App";

function ContentForm() {
  return (
    <>
      <Form.Item label="Title" name="title">
        <Input placeholder="Your Title" />
      </Form.Item>
      <Form.Item label="Content" name="content">
        <Input placeholder="Your content goes here" />
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

function ColorBar({ color, idx }: { color: IColor, idx: number }) {
  const { primary, secondary, accent } = color;
  const value = [primary, secondary, accent, idx].join(":");
  const variables = {
    '--primary': primary,
    '--secondary': secondary,
    '--accent': accent
  } as React.CSSProperties;
  return (
    <>
      <input
        className="color-bar__input"
        id={value}
        name="colors"
        type="radio"
      />
      <label 
        style={variables}
        className="color-bar__label" 
        htmlFor={value}
      >
      </label>
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
      primary: "rgb(74, 79, 199)",
      secondary: "rgb(121, 123, 150)",
      accent: "rgb(255, 255, 255)",
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
