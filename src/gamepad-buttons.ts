import gamepad from "jsgamepad";
import { Standard as gamepadMapping } from "./gamepad-mappings";

// TODO: implement save & load state in core

export class GamepadButtons {
  bind(gameboy) {
    gamepad.on("buttonPressed", ({ buttonIndex, button, gamepad }) => {
      gameboy.actionDown(gamepadMapping[buttonIndex]);
    });

    gamepad.on("buttonChanged", ({ buttonIndex, button, gamepad }) => {
      gameboy.actionChange(gamepadMapping[buttonIndex], {
        value: button.value
      });
    });

    gamepad.on("buttonReleased", ({ buttonIndex, button, gamepad }) => {
      gameboy.actionUp(gamepadMapping[buttonIndex]);
    });

    gamepad.watch();
  }
}

export default new GamepadButtons();
