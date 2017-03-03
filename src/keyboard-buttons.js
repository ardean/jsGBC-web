import $ from "jquery";
import keyboardMapping from "./keyboard-mapping.js";

class KeyboardButtons {
  bind(gameboy) {
    window.addEventListener("keydown", e => {
      if (gameboy.actions.is(keyboardMapping[e.keyCode])) {
        gameboy.actionDown(keyboardMapping[e.keyCode]);
        e.preventDefault();
        e.stopPropagation();
      }
    });

    window.addEventListener("keyup", e => {
      if (gameboy.actions.is(keyboardMapping[e.keyCode])) {
        gameboy.actionUp(keyboardMapping[e.keyCode]);
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }
}

export default new KeyboardButtons();
