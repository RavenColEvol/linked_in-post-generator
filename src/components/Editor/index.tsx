import {
  BgColorsOutlined,
  DownloadOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Tabs } from "antd";
import Renderer from "../Renderer";
import { ContentForm, SettingsForm, ThemeForm } from "./Forms";

const tabs = [
  {
    Label: () => (
      <>
        <EditOutlined /> Content
      </>
    ),
    Component: () => <ContentForm />,
  },
  {
    Label: () => (
      <>
        <SettingOutlined /> Settings
      </>
    ),
    Component: () => <SettingsForm />,
  },
  {
    Label: () => (
      <>
        <BgColorsOutlined /> Theme
      </>
    ),
    Component: () => <ThemeForm />,
  },
  {
    Label: () => (
      <>
        <DownloadOutlined /> Download
      </>
    ),
    Component: () => <span>Download</span>,
  },
];

function Editor() {
  return (
    <section className="editor">
      <Card className="canvas">
        <Renderer />
      </Card>
      <div className="form-container">
        <Tabs
          type="card"
          className="editor-tabs"
          items={tabs.map(({ Label, Component }, index) => ({
            label: <Label />,
            key: String(index),
            children: <Component />,
          }))}
        />
      </div>
    </section>
  );
}

export default Editor;
