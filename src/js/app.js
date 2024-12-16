import { PopoverBtnWidget } from "./popover-btn-widjet";

const title = "Popover title";
const message = "And here's some amazing content. It's very engaging. Right?";
const container = document.querySelector(".card");
const popoverBtn = new PopoverBtnWidget(container, title, message);

popoverBtn.bindToDOM();
popoverBtn.isClick();
