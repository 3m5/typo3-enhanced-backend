export default function stringToHTML(htmlString : string) {
  const dom = document.createElement('div');
  dom.innerHTML = htmlString;
  return dom;
}
