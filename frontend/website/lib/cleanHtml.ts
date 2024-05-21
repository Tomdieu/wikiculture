export const cleanHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, "");
};
