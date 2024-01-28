import { AllHTMLAttributes } from "react";
import { ISlide, State } from "../App";
import { getBg } from "./backgrounds";
import { useFormState } from "../hooks/stateContext";


function Renderer() {
  const [state] = useFormState()!;
  const { selectedIdx, slides, user, theme } = state;
  return (
    <div>
      <CardRenderer 
        slide={slides[selectedIdx]}
        user={user}
        theme={theme}
      />
    </div>
  )
}

interface CardRendererProps extends Pick<State, 'theme' | 'user'> {
  slide: ISlide;
  style?: React.CSSProperties;
}


export function CardRenderer(props: CardRendererProps) {
  const { slide, user, theme, style = {} } = props;
  const { title, text } = slide || {};

  const { background, colors } = theme;
  const { primary, secondary, accent } = colors;

  const { headshot, name, handle } = user;

  const rendererProps = { 
    backgroundImage: `${getBg(background, colors)}`,
    '--primary': primary,
    '--secondary': secondary,
    '--accent': accent,
    ...style
  } as React.CSSProperties;
  return (
    <div 
    className="renderer-card"
    style={rendererProps}>
      <div className="main">
        <h1>{title}</h1>
        <p className="text">{text}</p>
      </div>
      <div className="user">
        {headshot && <img src={headshot} className='headshot'/>}
        <div>
          {name && <span className="name">{name}</span>}
          {handle && <span className="handle">@{handle}</span>}
        </div>
      </div>
    </div>
  )
}

export default Renderer;