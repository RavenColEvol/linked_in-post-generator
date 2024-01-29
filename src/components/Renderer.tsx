import { ISlide, State } from "../App";
import { getBg, getBgSVG } from "./backgrounds";
import { useFormState } from "../hooks/stateContext";
import {
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  // PDFViewer,
  // Document
} from "@react-pdf/renderer";
import { blobToPng, svgToPng } from "./utils";

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
      {/* <PDFViewer>
        <Document>
          <ReactPDFCardRenderer
            slide={slides[selectedIdx]}
            user={user}
            theme={theme}
          />
        </Document>
      </PDFViewer> */}
    </div>
  );
}

interface CardRendererProps extends Pick<State, "theme" | "user"> {
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
    "--primary": primary,
    "--secondary": secondary,
    "--accent": accent,
    ...style,
  } as React.CSSProperties;
  return (
    <div className="renderer-card" style={rendererProps}>
      <div className="main">
        <h1>{title}</h1>
        <p className="text">{text}</p>
      </div>
      <div className="user">
        {headshot && <img src={headshot} className="headshot" />}
        <div>
          {name && <span className="name">{name}</span>}
          {handle && <span className="handle">@{handle}</span>}
        </div>
      </div>
    </div>
  );
}

Font.register({
  family: "Poppins",
  src: "/fonts/Poppins-SemiBold.ttf",
  fontWeight: "semibold",
});

Font.register({
  family: "Poppins",
  src: "/fonts/Poppins-Bold.ttf",
  fontWeight: "bold",
});

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

Font.registerHyphenationCallback(word => (
  [word]
));

export function ReactPDFCardRenderer(props: CardRendererProps) {
  const { slide, user, theme } = props;
  const { title, text } = slide || {};

  const { background, colors } = theme;
  const { primary, secondary, accent } = colors;

  const { headshot, name, handle } = user;

  const styles = StyleSheet.create({
    frameSize: {
      width: "400",
      height: "400",
    },
    page: {
      position: "relative",
      backgroundColor: accent,
    },
    renderer: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "8%",
      fontWeight: "semibold",
      fontFamily: "Poppins",
    },
    bgImg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    main: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
    },
    title: {
      fontSize: "40pt",
      lineHeight: "1",
      marginBottom: "20pt",
      fontWeight: "bold",
      color: primary,
    },
    content: {
      color: secondary,
      fontSize: '16pt'
    },
    user_container: {
      display: "flex",
      gap: "10pt",
      fontSize: "3vw",
      flexDirection: "row",
      alignItems: "center",
    },
    user_img: {
      objectFit: "cover",
      width: "35pt",
      height: "35pt",
      borderRadius: "50%",
    },
    user_name: {
      color: primary,
      lineHeight: "1.2",
    },
    user_handle: {
      color: secondary,
    },
  });

  return (
    <Page style={styles.page} size={{ width: "400", height: "500" }}>
      <Image
        style={styles.bgImg}
        src={() => svgToPng(getBgSVG(background, colors))}
      />
      <View style={styles.renderer} id="renderer">
        <View style={styles.main} id="main">
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{text}</Text>
        </View>
        <View style={styles.user_container} id="user">
          {headshot && (
            <Image style={styles.user_img} src={() => blobToPng(headshot)} />
          )}
          <View id="user__description">
            {name && <Text style={styles.user_name}>{name}</Text>}
            {handle && <Text style={styles.user_handle}>@{handle}</Text>}
          </View>
        </View>
      </View>
    </Page>
    // <PDFViewer style={{width: '400', height: '500'}}>
    //   <Document>

    //   </Document>
    // </PDFViewer>
  );
}

export default Renderer;
