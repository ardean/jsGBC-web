import * as $ from "jquery";

export class SoftwareButtons {
  bind(gameboy, jsGBCui) {
    jsGBCui.addEventListener("down", ({ detail }) => {
      gameboy.actionDown(detail.button);
    });

    jsGBCui.addEventListener("up", ({ detail }) => {
      gameboy.actionUp(detail.button);
    });
  }
}

export default new SoftwareButtons();
