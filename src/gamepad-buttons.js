import $ from "jquery";
import gamepad from "jsgamepad";
import actions from "./actions.js";

// TODO: implement save, load, speed in core

class GamepadButtons {
  bind(gameboy) {
    gamepad.on("buttonPressed", ({ buttonIndex, button, gamepad }) => {
      const action = actions.fromGamepad(buttonIndex);
      if (action) {
        gameboy.actionDown(action);
      }
    });

    gamepad.on("buttonChanged", ({ buttonIndex, button, gamepad }) => {
      const action = actions.fromGamepad(buttonIndex);
      if (action === "speed") {
        gameboy.setSpeed(this.getSpeedValue(button));
      }
    });

    gamepad.on("buttonReleased", ({ buttonIndex, button, gamepad }) => {
      const action = actions.fromGamepad(buttonIndex);
      if (action) {
        gameboy.actionUp(action);
      }
    });

    gamepad.watch();
  }

  getSpeedValue(button) {
    return (button && typeof button.value === "number" ? button.value : 1) * 2 +
      1;
  }
}

export default new GamepadButtons();
