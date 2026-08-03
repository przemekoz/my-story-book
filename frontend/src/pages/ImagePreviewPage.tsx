export const ImagePreviewPage = () => {
  const search = globalThis.location.search;
  const params = new URLSearchParams(search);
  const imageUrl = params.get("image");
  console.log("1", imageUrl);
  if (imageUrl) {
    return <img src={imageUrl} width={1024} alt="preview" />;
  }
  return null;
};
