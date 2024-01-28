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

const svgUrlToPng = async (svgUrl: string) => {
  let res: any, rej: any;
  const promise = new Promise((resolve, reject) => [res, rej] = [resolve, reject]);
  const svgImage = document.createElement("img");
  document.body.appendChild(svgImage);
  svgImage.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = svgImage.clientWidth;
    canvas.height = svgImage.clientHeight;
    const canvasCtx = canvas.getContext("2d")!;
    canvasCtx.drawImage(svgImage, 0, 0);
    const imgData = canvas.toDataURL("image/png");
    res(imgData);
    document.body.removeChild(svgImage);
  };
  svgImage.onerror = function() {
    rej('Unable to convert image')
  }
  svgImage.src = svgUrl;
  return promise;
}
