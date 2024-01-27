import { BgColorsOutlined, DownloadOutlined, EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Form, Tabs } from "antd";
import Renderer from "../Renderer";
import { useFormState } from "../../hooks/stateContext";
import { ContentForm, SettingsForm, ThemeForm } from "./Forms";

const tabs = [
  {
    Label: () => <><EditOutlined /> Content</>,
    Component: () => <ContentForm />
  },
  {
    Label: () => <><SettingOutlined /> Settings</>,
    Component: () => <SettingsForm />
  },
  {
    Label: () => <><BgColorsOutlined /> Theme</>,
    Component: () => <ThemeForm />
  },
  {
    Label: () => <><DownloadOutlined /> Download</>,
    Component: () => <span>Download</span>
  },
]

function Editor() {
  const [state] = useFormState()!;
  const [form] = Form.useForm();

  return (
    <section className="editor">
      <Card className="canvas">
        <Renderer state={state}/>
      </Card>
      <div className="form-container">
        <Form 
          layout="vertical"
          form={form}
        >
          <Tabs 
            type='card'
            className='editor-tabs'
            items={tabs.map(({ Label, Component }, index) => ({
              label: <Label />,
              key: String(index),
              children: <Component />
            }))}
          />
        </Form>
      </div>
      <form action="">
      </form>
    </section>
  )
}

export default Editor;