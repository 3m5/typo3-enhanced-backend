/**
 * Class names of the extension are only injected in the root document
 * we add all enba-* class names to all iframes that are loaded later
 */
export default function InitEnbaClassNames() {
  if (typeof window !== "undefined") {
    const classList = window.parent?.document?.querySelector('html')?.classList;
    const enbaClassNames = classList ? Array.from(classList) : [];
    enbaClassNames.filter(className => !className.startsWith('enba'));
    document.querySelector('html')?.classList.add(...enbaClassNames);
  }
}

