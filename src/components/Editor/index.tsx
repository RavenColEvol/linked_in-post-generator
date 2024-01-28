import {
  BgColorsOutlined,
  DownloadOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Tabs } from "antd";
import Renderer from "../Renderer";
import { ContentForm, SettingsForm, ThemeForm } from "./Forms";
import { useState } from "react";

const tabs = [
  {
    uid: 'edit',
    Label: () => (
      <>
        <EditOutlined /> Content
      </>
    ),
    Component: () => <ContentForm />,
  },
  {
    uid: 'setting',
    Label: () => (
      <>
        <SettingOutlined /> Settings
      </>
    ),
    Component: () => <SettingsForm />,
  },
  {
    uid: 'theme',
    Label: () => (
      <>
        <BgColorsOutlined /> Theme
      </>
    ),
    Component: () => <ThemeForm />,
  },
  {
    uid: 'download',
    Label: () => (
      <>
        <DownloadOutlined /> Download
      </>
    ),
    Component: () => <></>
  },
];

function Editor() {
  const [activeKey, setActiveKey] = useState(tabs[0].uid);

  const handleTabClick = (key: string) => {
    if (key !== 'download') {
      return setActiveKey(key);
    }

    console.log('download');
  }

  return (
    <section className="editor">
      <Card className="canvas">
        <Renderer />
      </Card>
      <div className="form-container">
        <Tabs
          activeKey={activeKey}
          type="card"
          className="editor-tabs"
          onTabClick={handleTabClick}
          items={tabs.map(({ Label, Component, uid }) => ({
            label: <Label />,
            key: uid,
            children: <Component />,
          }))}
        />
      </div>
    </section>
  );
}

export default Editor;
