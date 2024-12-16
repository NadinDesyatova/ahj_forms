import { PopoverBtnWidget } from "../popover-btn-widjet.js";
import { Popover } from "../popover.js";

const title = "Popover title";
const message = "And here's some amazing content. It's very engaging. Right?";

/**
 * @jest-environment jsdom
 */
test("widget should render", () => {
  document.body.innerHTML = `<div class="container"></div>`;

  const container = document.querySelector(".container");
  const popoverBtn = new PopoverBtnWidget(container, title, message);
  popoverBtn.bindToDOM();

  const parent = document.createElement("div");
  parent.innerHTML = PopoverBtnWidget.markup;
  const element = parent.querySelector(PopoverBtnWidget.selector);
  element.setAttribute("title", title);
  element.dataset.content = message;
  const expected = parent.innerHTML;

  expect(container.innerHTML).toBe(expected);
});

/**
 * @jest-environment jsdom
 */
test("widget should add popover", () => {
  document.body.innerHTML = `<div class="container"></div>`;

  const container = document.querySelector(".container");
  const popoverBtn = new PopoverBtnWidget(container, title, message);
  popoverBtn.bindToDOM();
  popoverBtn.isClick();

  popoverBtn.element.click();

  const currentPopover = document.body.querySelector(".popover");

  const popoverEl = document.createElement("div");
  popoverEl.classList.add("popover");
  popoverEl.setAttribute("style", "left: 0px; top: -8px;");
  popoverEl.innerHTML = Popover.markup;
  popoverEl.querySelector(".popover-header").textContent = title;
  popoverEl.querySelector(".popover-body").textContent = message;

  const expected = popoverEl.outerHTML;

  expect(currentPopover.outerHTML).toBe(expected);
});

/**
 * @jest-environment jsdom
 */
test("widget should remove popover", () => {
  document.body.innerHTML = `<div class="container"></div>`;

  const container = document.querySelector(".container");
  const popoverBtn = new PopoverBtnWidget(container, title, message);
  popoverBtn.bindToDOM();
  popoverBtn.isClick();

  popoverBtn.element.click();
  popoverBtn.element.click();

  const currentPopover = document.body.querySelector(".popover");

  const expected = null;

  expect(currentPopover).toBe(expected);
});
