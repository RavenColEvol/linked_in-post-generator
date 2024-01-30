import { v4 } from "uuid";
import { mergeRefs } from "react-merge-refs";
import { useFormState } from "../../hooks/stateContext";
import { CardRenderer } from "../Renderer";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import clsx from "clsx";
import { useRef } from "react";
import { ISlide } from "../../App";

const reorder = (list: ISlide[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

  const handleDrop = (result: any) => {
    if (!result.destination) return;
    setFormState(form => {
      const newSlides = reorder(
        form.slides, 
        result.source.index,
        result.destination.index
      );
      return {
        ...form,
        slides: newSlides
      };
    });
  }

  const handleDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDrop}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div 
            className="preview-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {contextHolder}
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
            <AddBlock hide={snapshot.isDraggingOver}/>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const CardWrapper = (props: any) => {
  const { isactive, uid, onClick, index } = props;
  const cardRef = useRef<null | HTMLDivElement>(null);

  return (
    <Draggable key={uid} draggableId={uid} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={onClick}
          ref={mergeRefs([provided.innerRef, cardRef])}
          className={clsx("preview_card__wrapper", {
            "card_wrapper--active": isactive,
            "card_wrapper--dragging": snapshot.isDragging,
          })}
          style={{...provided.draggableProps.style}}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.children}
        </div>
      )}
    </Draggable>
  );
};

function AddBlock({ hide }: {
  hide: boolean
}) {
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

  const style = hide ? {
    display: 'none'
  }: undefined;

  return (
    <div
      onClick={handleClick}
      title="Add Block"
      className="add-slide-container"
      style={style}
    >
      +
    </div>
  );
}

export default Preview;
