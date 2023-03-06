export function checkIframeLoaded(querySelector, functionToExecute) {
  // console.log(" function checked")
  // Get a handle to the iframe element
  const iframe = document.querySelector(querySelector);
  console.log("iframe", iframe)
  // check if the iframe is loaded or not (= undefined = null)
  if (iframe == null) {
    // If we are here, it is not loaded. Set things up so we check the status again in 1000 milliseconds
    window.setTimeout(checkIframeLoaded, 1000);
  } else {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    // Check if loading is completed
    if (iframeDoc.readyState == 'complete') {

      // The loading is complete, call the function we want executed once the iframe is loaded
      iframeDoc.addEventListener("keydown", functionToExecute, false);
    } else {
      // even if the iframe is loaded the "readystate may not be completed yet" so we need to recall the function.
      window.setTimeout(checkIframeLoaded, 1000);
    }
  }
}

