import { AllHTMLAttributes } from "react";
import { ISlide, State } from "../App";
import { getBg } from "./backgrounds";

interface RendererProps extends AllHTMLAttributes<HTMLDivElement> {
  state: State
}

function Renderer(props: RendererProps) {
  const { state } = props;
  const { selectedIdx, slides, user, theme } = state;
  return (
    <div {...props}>
      <Card 
        slide={slides[selectedIdx]}
        user={user}
        theme={theme}
      />
    </div>
  )
}

interface CardRendererProps extends Pick<State, 'theme' | 'user'> {
  slide: ISlide
}


function Card(props: CardRendererProps) {
  const { slide, user, theme} = props;
  const { title, text } = slide;

  const { background, colors } = theme;
  const { primary, secondary, accent } = colors;

  const { headshot, name, handle } = user;

  const rendererProps = { 
    backgroundImage: `${getBg(background, colors)}`,
    '--primary': primary,
    '--secondary': secondary,
    '--accent': accent
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