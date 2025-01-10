export function hideOnClickOutside(trigger: HTMLElement, elementToHide: HTMLElement) {
  //
  const outsideClickListener = (event: Event) => {
    const isTriggerClicked = event.target == trigger

    if (!elementToHide.contains(event.target as Node) && !isTriggerClicked) {
      removeClickListener()
      elementToHide.classList.add('hidden')
    }
  }

  const removeClickListener = () => {
    document.body.removeEventListener('click', outsideClickListener)
  }
  document.body.addEventListener('click', outsideClickListener)
}

