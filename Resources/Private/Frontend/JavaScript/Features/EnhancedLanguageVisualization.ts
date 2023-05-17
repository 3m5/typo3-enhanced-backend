export default function InitEnhancedLanguageVisualization() {
  document.querySelectorAll<HTMLTableCellElement>('.t3-page-column-lang-name').forEach(languageNameCell => {
    const language : string | null = languageNameCell.getAttribute('data-language-title');
    const languageIcon : HTMLSpanElement | null = document.querySelector('.t3js-flag[title="' + language + '"]');
    if(!!languageIcon) {
      languageNameCell.querySelector('h2')?.prepend(languageIcon);
    }
  });
}
