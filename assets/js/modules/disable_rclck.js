function disableRightClick (element) {
  function preventer (event) {
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }
  if(element.addEventListener) {
    element.addEventListener('contextmenu', preventer, false);
  } else if(document.attachEvent) {
    element.attachEvent('oncontextmenu', preventer );
  }
}
disableRightClick(document);