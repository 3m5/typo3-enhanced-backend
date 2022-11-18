document.querySelectorAll('[data-identifier="actions-add"]').forEach(button => {
  button.setAttribute('title', 'Create new content element');
  button.parentNode.innerHTML = button.outerHTML;
});
