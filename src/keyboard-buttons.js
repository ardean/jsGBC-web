import $ from "jquery";
import actions from "./actions.js";

class KeyboardButtons {
  bind(gameboy) {
    window.addEventListener("keydown", e => {
      const action = actions.fromKeyboard(e.keyCode);
      if (action) {
        gameboy.actionDown(action);
        e.preventDefault();
        e.stopPropagation();
      }
    });

    window.addEventListener("keyup", e => {
      const action = actions.fromKeyboard(e.keyCode);
      if (action) {
        gameboy.actionUp(action);
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }
}

export default new KeyboardButtons();
