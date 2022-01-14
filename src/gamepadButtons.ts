import GameBoy from "jsgbc";
import gamepad from "jsgamepad";
import { Standard as gamepadMapping } from "./gamepadMappings";

export class GamepadButtons {
  bind(gameboy: GameBoy) {
    gamepad.on("buttonPressed", ({ buttonIndex }) => {
      gameboy.actionDown(gamepadMapping[buttonIndex]);
    });

    gamepad.on("buttonChanged", ({ buttonIndex, button }) => {
      gameboy.actionChange(gamepadMapping[buttonIndex], {
        value: button.value
      });
    });

    gamepad.on("buttonReleased", ({ buttonIndex }) => {
      gameboy.actionUp(gamepadMapping[buttonIndex]);
    });

    gamepad.watch();
  }
}

export default new GamepadButtons();
