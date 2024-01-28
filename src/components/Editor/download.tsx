import { pdf, Document } from "@react-pdf/renderer"
import { State } from "../../App"
import { ReactPDFCardRenderer } from "../Renderer";
import { MessageInstance } from "antd/es/message/interface";

const Output = (form: State) => (
  <Document>
    {form.slides.map(slide => 
      <ReactPDFCardRenderer 
        slide={slide}
        theme={form.theme} 
        user={form.user}
      />
    )}
  </Document>
);

export const download = async (api: MessageInstance,form: State) => {
  api.open({
    type: 'loading',
    content: 'PDF Generation has started.',
  });
  const blob = await pdf(Output(form)).toBlob();
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', form.slides[0].title + '.pdf');
  const href = URL.createObjectURL(blob);
  downloadLink.setAttribute('href', href);
  downloadLink.setAttribute('target', '_blank');
  downloadLink.click();
  URL.revokeObjectURL(href);
  api.destroy();
}