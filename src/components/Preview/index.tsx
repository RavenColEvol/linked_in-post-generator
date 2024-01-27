import { v4 } from 'uuid';
import { useFormState } from "../../hooks/stateContext";
import { CardRenderer } from "../Renderer";
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function Preview() {
  const [form, setFormState] = useFormState()!;

  const handleDelete = (uid: string) => {
    setFormState(form => {
      if (form.slides.length === 1) {
        return form;
      }
      return {
        ...form,
        slides: form.slides.filter(slide => slide.uid !== uid)
      }
    })
  }
  return (
    <div className="preview-container" style={{fontSize: '4px'}}>
      {form.slides.map((slide) => (
        <CardWrapper 
        handleSwitch={() => {

        }}
        handleDelete={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleDelete(slide.uid)
        }} key={slide.uid}>
          <CardRenderer
            key={slide.uid}
            style={{ width: '6rem' }}
            slide={slide} 
            user={form.user} 
            theme={form.theme} 
          />
        </CardWrapper>
      ))}
      <AddBlock />
    </div>
  );
}

function CardWrapper({ children, handleDelete, handleSwitch }: {
  handleDelete: (e: any) => void,
  handleSwitch: (e: any) => void,
  children: React.ReactNode
}) {
  return (
    <div onClick={handleSwitch} className='delete_wrapper'>
      {children}
      <Button size='small' onClick={handleDelete}><DeleteOutlined /></Button>
    </div>
  )
}

function AddBlock() {
  const [, setFormState] = useFormState()!;
  const handleClick = () => {
    setFormState(form => ({
      ...form,
      slides: [...form.slides, {
        uid: v4(),
        title: 'Your Title',
      }]
    }))
  };

  return (
    <div onClick={handleClick} title="Add Block" className="add-slide-container">
      +
    </div>
  )
}

export default Preview;
