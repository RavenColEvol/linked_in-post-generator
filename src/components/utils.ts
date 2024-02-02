export const svgToPng = async (svg: string) => {
  const url = getSvgUrl(svg);
  const result = await svgUrlToPng(url);
  URL.revokeObjectURL(url);
  return result;
}

export const blobToPng = async (url: any) => {
  const result = await svgUrlToPng(url);
  return result;
}

const getSvgUrl = (svg: string) => {
  return URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
}

const scale = window.devicePixelRatio;

const svgUrlToPng = async (svgUrl: string) => {
  let res: any, rej: any;
  const promise = new Promise((resolve, reject) => [res, rej] = [resolve, reject]);
  const svgImage = document.createElement("img");
  const hiddenRenderer = document.getElementById('hidden-renderer')!;
  hiddenRenderer.appendChild(svgImage);
  svgImage.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(svgImage.clientWidth * scale);
    canvas.height = Math.floor(svgImage.clientHeight * scale);
    const canvasCtx = canvas.getContext("2d")!;
    canvasCtx.drawImage(svgImage, 0, 0, canvas.width, canvas.height);
    canvasCtx.scale(scale, scale);
    const imgData = canvas.toDataURL("image/png");
    res(imgData);
    hiddenRenderer.removeChild(svgImage);
  };
  svgImage.onerror = function() {
    rej('Unable to convert image')
  }
  svgImage.src = svgUrl;
  return promise;
}