import * as $ from "jquery";

export class Notifier {
  timeout: number;
  $element: JQuery<HTMLElement>;

  constructor() {
    this.$element = $("<div />").css({
      display: "none",
      position: "absolute",
      top: "5px",
      right: "5px",
      fontSize: "25px",
      color: "red"
    });

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

    this.$element.text(message);
    this.$element.show();
  }

  hide() {
    this.timeout = null;
    this.$element.hide();
  }

  appendTo(element) {
    this.$element.appendTo(element);
  }
}

export default new Notifier();
