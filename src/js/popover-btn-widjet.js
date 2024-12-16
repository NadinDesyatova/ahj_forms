import { Popover } from "./popover";

export class PopoverBtnWidget {
  constructor(parentEl, title, message) {
    this.parentEl = parentEl;
    this.title = title;
    this.message = message;
    this.actualMessage = {};

    this.showPopover = this.showPopover.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  static get markup() {
    return `
      <button type="button" class="btn" data-toggle="popover">Click to toggle popover</button>
    `;
  }

  static get selector() {
    return ".btn";
  }

  bindToDOM() {
    this.parentEl.innerHTML = PopoverBtnWidget.markup;
    this.element = this.parentEl.querySelector(PopoverBtnWidget.selector);
    this.element.setAttribute("title", this.title);
    this.element.dataset.content = this.message;
  }

  showPopover(el) {
    this.popover = new Popover();

    this.actualMessage = {
      title: el.title,
      id: this.popover.showPopover(this.title, this.message, el),
    };
  }

  onClick(e) {
    e.preventDefault();

    if (e.target === this.element) {
      if (!Object.keys(this.actualMessage).length) {
        this.showPopover(this.element);
      } else {
        this.popover.removePopover(this.actualMessage.id);
        this.actualMessage = {};
      }
    }
  }

  isClick() {
    this.parentEl.addEventListener("click", this.onClick);
  }
}
