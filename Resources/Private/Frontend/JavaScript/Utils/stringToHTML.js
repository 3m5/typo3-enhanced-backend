export default function stringToHTML(htmlString) {
  const dom = document.createElement('div');
  dom.innerHTML = htmlString;
  return dom;
}
