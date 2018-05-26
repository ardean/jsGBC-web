import * as $ from "jquery";
import { util } from "jsgbc";

export class FabButtons {
  gameboy: any;

  bind(gameboy) {
    this.gameboy = gameboy;

    const insertCartridgeButton = document.querySelector("#insert-cartridge");
    const downloadSaveButton = document.querySelector("#download-save");
    const uploadSaveButton = document.querySelector("#upload-save");

    const insertCartridgeInput = insertCartridgeButton.querySelector("input") as HTMLInputElement;
    const uploadSaveInput = uploadSaveButton.querySelector("input") as HTMLInputElement;

    insertCartridgeInput.addEventListener("change", async () => {
      downloadSaveButton.classList.remove("disabled");
      uploadSaveButton.classList.remove("disabled");

      const result = await this.readFile(insertCartridgeInput);
      gameboy.replaceCartridge(result);
    });

    downloadSaveButton.addEventListener("click", () => {
      if (!gameboy.core.cartridgeSlot.cartridge) return;

      util.downloadFile(gameboy.core.cartridgeSlot.cartridge.name + ".sav", gameboy.getBatteryFileArrayBuffer());
    });

    uploadSaveInput.addEventListener("change", async () => {
      if (!gameboy.core.cartridgeSlot.cartridge) return;

      const result = await this.readFile(uploadSaveInput);
      await gameboy.loadBatteryFileArrayBuffer(result);
    });
  }

  async readFile(element: HTMLInputElement) {
    return new Promise<FileReader["result"]>((resolve, reject) => {
      if (element.files.length > 0) {
        const file = element.files[0];
        const binaryHandle = new FileReader();
        binaryHandle.addEventListener("load", function () {
          if (this.readyState === 2) {
            resolve(this.result);
          }
        });
        binaryHandle.readAsBinaryString(file);
      } else {
        reject();
      }
    });
  }
}

export default new FabButtons();