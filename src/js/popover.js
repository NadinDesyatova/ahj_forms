export class Popover {
  constructor() {
    this._popovers = [];
  }

  static get markup() {
    return `
      <div class="popover-arrow""></div>
      <h3 class="popover-header"></h3>
      <div class="popover-body"></div>
    `;
  }

  showPopover(title, message, elem) {
    const popoverElement = document.createElement("div");

    popoverElement.classList.add("popover");
    popoverElement.innerHTML = Popover.markup;

    popoverElement.querySelector(".popover-header").textContent = title;
    popoverElement.querySelector(".popover-body").textContent = message;

    const id = performance.now();

    this._popovers.push({
      id,
      element: popoverElement,
    });

    document.body.appendChild(popoverElement);

    const { left, top } = elem.getBoundingClientRect();

    popoverElement.style.left =
      left + elem.offsetWidth / 2 - popoverElement.offsetWidth / 2 + "px";
    popoverElement.style.top = top - popoverElement.offsetHeight - 8 + "px";

    return id;
  }

  removePopover(id) {
    const popover = this._popovers.find((p) => p.id === id);

    popover.element.remove();

    this._popovers = this._popovers.filter((p) => p.id !== id);
  }
}
