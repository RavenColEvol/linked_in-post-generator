import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, GetProp, Input, Select, Upload } from "antd";
import { useState } from "react";
import { Backgrounds, IColor } from "../../App";
import { useFormState } from "../../hooks/stateContext";
import { BACKGROUNDS, THEMES } from "../../constants";
import { UploadChangeParam, UploadProps } from "antd/es/upload";

function ContentForm() {
  const [form, setFormState] = useFormState()!;
  const { selectedIdx } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          type="text"
          placeholder="Your Title"
          allowClear
        />
      </Form.Item>
      <Form.Item label="Content" name="text">
        <Input.TextArea
          onChange={handleChange}
          placeholder="Your content goes here"
          allowClear
        />
      </Form.Item>
    </>
  );
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

function SettingsForm() {
  const [form, setFormState] = useFormState()!;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(form => ({
      ...form,
      user: {
        ...form.user,
        [event.target.id]: event.target.value
      }
    }))
  }

  const handleFileChange  = (event: UploadChangeParam) => {
    const { file } = event;
    getBase64(file as FileType, (url) => {
      setFormState(form => ({
        ...form,
        user: {
          ...form.user,
          headshot: url
        }
      }))
    });
  }

  const handleRemove = () => {
    setFormState(form => ({
      ...form,
      user: {
        ...form.user,
        headshot: ''
      }
    }))
  }

  const { handle, name } = form.user;
  return (
    <>
      <Form.Item label="Headshot" name="headshot">
        <Upload onRemove={handleRemove} listType="picture" maxCount={1} beforeUpload={() => false} accept="image/*" onChange={handleFileChange}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input allowClear onChange={handleChange} defaultValue={name} placeholder="Your Name" />
      </Form.Item>
      <Form.Item label="Handle" name="handle">
        <Input allowClear onChange={handleChange} addonBefore='@' defaultValue={handle} placeholder="Your LinkedIn Handle" />
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
  const [form,setFormState] = useFormState()!;
  const [themes] = useState(THEMES);
  const [backgroundOptions] = useState(() => BACKGROUNDS.map(background => ({
    label: background.charAt(0).toUpperCase() + background.slice(1),
    value: background
  })));

  const handleChange = (background: Backgrounds) => {
    setFormState(form => ({
      ...form,
      theme: {
        ...form.theme,
        background
      }
    }));
  }

  return (
    <>
      <Form.Item label="Background" name="background">
        <Select 
          defaultValue={form.theme.background} 
          onChange={handleChange} 
          options={backgroundOptions} 
        />
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
