import GameBoy from "jsgbc";
import JsGbcUI from "jsgbc-ui";

export class SoftwareButtons {
  bind(gameboy: GameBoy, jsGbcUI: JsGbcUI) {
    jsGbcUI.addListener("ButtonDown", (buttonName: string) => {
      gameboy.actionDown(buttonName.toLowerCase());
    });

    jsGbcUI.addListener("ButtonUp", (buttonName: string) => {
      gameboy.actionUp(buttonName.toLowerCase());
    });
  }
}

export default new SoftwareButtons();
