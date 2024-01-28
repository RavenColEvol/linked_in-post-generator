import { v4 } from "uuid";
import { useFormState } from "../../hooks/stateContext";
import { CardRenderer } from "../Renderer";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import clsx from "clsx";

function Preview() {
  const [form, setFormState] = useFormState()!;
  
  const handleDelete = (event: React.MouseEvent<HTMLElement>, uid: string) => {
    event.stopPropagation();
    event.preventDefault();

    if (form.slides.length === 1) {
      return console.log("can't delete it");
    }
    setFormState((form) => {
      return {
        ...form,
        slides: form.slides.filter((slide) => slide.uid !== uid),
      };
    });
  };

  const changePreview = (index: number) => {
    setFormState((form) => {
      return {
        ...form,
        selectedIdx: index
      }
    });
  }

  return (
    <div className="preview-container" style={{ fontSize: "4px" }}>
      {form.slides.map((slide, idx) => (
        <CardWrapper
          onClick={() => changePreview(idx)}
          key={slide.uid}
          isActive={form.selectedIdx === idx}
        >
          <CardRenderer
            key={slide.uid}
            style={{ width: "6rem" }}
            slide={slide}
            user={form.user}
            theme={form.theme}
          />
          <Button size="small" onClick={(e) => handleDelete(e, slide.uid)}>
            <DeleteOutlined />
          </Button>
        </CardWrapper>
      ))}
      <AddBlock />
    </div>
  );
}

const CardWrapper = (props: any) => {
  const { isActive } = props;
  return (
    <div {...props} className={clsx('preview_card__wrapper', { 'card_wrapper--active': isActive })}>
      {props.children}
    </div>
  );
};

function AddBlock() {
  const [, setFormState] = useFormState()!;
  const handleClick = () => {
    setFormState((form) => ({
      ...form,
      slides: [
        ...form.slides,
        {
          uid: v4(),
          title: "Your Title",
        },
      ],
    }));
  };

  return (
    <div
      onClick={handleClick}
      title="Add Block"
      className="add-slide-container"
    >
      +
    </div>
  );
}

export default Preview;
