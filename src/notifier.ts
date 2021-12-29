export class Notifier {
  timeout: number;
  element: HTMLElement;

  constructor() {
    this.element = document.createElement("div");

    this.element.style.display = "none";
    this.element.style.position = "absolute";
    this.element.style.top = "5px";
    this.element.style.right = "5px";
    this.element.style.fontSize = "25px";
    this.element.style.color = "red";

    this.hide = this.hide.bind(this);
  }

  bind(gameboy) {
    gameboy
      .on("stateLoaded", ({ filename }) => {
        this.notify("Loaded " + filename);
      })
      .on("stateSaved", ({ filename }) => {
        this.notify("Saved  " + filename);
      });
  }

  notify(message) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = window.setTimeout(this.hide, 500);

    this.element.textContent = message;
    this.element.style.display = "block";
  }

  hide() {
    this.timeout = null;
    this.element.style.display = "none";
  }

  appendTo(element: HTMLElement) {
    this.element.appendChild(element);
  }
}

export default new Notifier();
