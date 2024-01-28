import { v4 } from "uuid";
import { mergeRefs } from "react-merge-refs";
import { useFormState } from "../../hooks/stateContext";
import { CardRenderer } from "../Renderer";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import clsx from "clsx";
import { useRef } from "react";

function Preview() {
  const dropLineRef = useRef<null | HTMLDivElement>(null);
  const [form, setFormState] = useFormState()!;
  const [api, contextHolder] = notification.useNotification();

  const handleDelete = (event: React.MouseEvent<HTMLElement>, uid: string) => {
    event.stopPropagation();
    event.preventDefault();

    if (form.slides.length === 1) {
      return api.warning({
        message: "Unable to Delete",
        description: `Current slide can't be deleted as it's last slide.`,
        placement: "bottom",
      });
    }
    setFormState((form) => {
      const newState = { ...form };
      newState.slides = form.slides.filter((slide) => slide.uid !== uid);
      newState.selectedIdx = Math.min(
        newState.selectedIdx,
        newState.slides.length - 1
      );
      return newState;
    });
  };

  const changePreview = (index: number) => {
    setFormState((form) => {
      return {
        ...form,
        selectedIdx: index,
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="preview-container">
        {contextHolder}
        <div className="drop_line" ref={dropLineRef}></div>
        {form.slides.map((slide, idx) => (
          <CardWrapper
            onClick={() => changePreview(idx)}
            key={slide.uid}
            uid={slide.uid}
            index={idx}
            isactive={!!(form.selectedIdx === idx)}
            droplineref={dropLineRef}
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
    </DndProvider>
  );
}

const dndCardType = "preview-card";

const getDirection = (cardRef: any, monitor: any) => {
  const { left, width } = cardRef.current.getBoundingClientRect();
  const monitorOffset = monitor.getClientOffset();
  const mid = left + width / 2;
  return monitorOffset!.x < mid ? "left" : "right";
};

const CardWrapper = (props: any) => {
  const [, setFormState] = useFormState()!;
  const { isactive, droplineref, uid, onClick } = props;
  const cardRef = useRef<null | HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dndCardType,
      item: {
        uid,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: () => {
        droplineref.current.style = null;
      },
    }),
    [uid]
  );

  const [, drop] = useDrop(
    () => ({
      accept: dndCardType,
      drop: (item, monitor) => {
        if (item && cardRef.current) {
          const direction = getDirection(cardRef, monitor);
          setFormState((form) => {
            const newState = { ...form };
            const [from, to] = [
              newState.slides.findIndex(slide => slide.uid === item.uid),
              newState.slides.findIndex(slide => slide.uid === uid),
            ];
            const dragged = newState.slides.splice(from, 1);

            newState.slides.splice(
              direction === "left" ? to : to + 1,
              0,
              ...dragged
            );
            return newState;
          });
        }
      },
      canDrop: (item: any) => item.uid !== uid,
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
        };
      },
      hover: (item, monitor) => {
        if (item && cardRef.current && droplineref.current) {
          const { left, width, top, height } =
            cardRef.current.getBoundingClientRect();
          const direction = getDirection(cardRef, monitor);
          droplineref.current.style.top = top + "px";
          droplineref.current.style.height = height + "px";
          droplineref.current.style.left =
            (direction === "left" ? left : left + width) + "px";
        }
      },
    }),
    [uid]
  );

  return (
    <div
      onClick={onClick}
      ref={mergeRefs([drag, drop, cardRef])}
      className={clsx("preview_card__wrapper", {
        "card_wrapper--active": isactive,
        "card_wrapper--dragging": isDragging,
      })}
      style={{}}
    >
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
