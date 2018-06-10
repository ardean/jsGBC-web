import { util } from "jsgbc";

export class FabButtons {
  gameboy: any;

  bind(gameboy) {
    this.gameboy = gameboy;

    const insertCartridgeButton = document.querySelector<HTMLInputElement>("#insert-cartridge");
    const downloadSaveButton = document.querySelector("#download-save");
    const uploadSaveButton = document.querySelector<HTMLInputElement>("#upload-save");

    const insertCartridgeInput = insertCartridgeButton.querySelector("input") as HTMLInputElement;
    const uploadSaveInput = uploadSaveButton.querySelector("input") as HTMLInputElement;

    insertCartridgeInput.addEventListener("change", async () => {
      downloadSaveButton.classList.remove("disabled");
      uploadSaveButton.classList.remove("disabled");

      const file = insertCartridgeInput.files[0];
      const rom = await util.readCartridgeROM(file, file.name);
      gameboy.replaceCartridge(rom);
    });

    downloadSaveButton.addEventListener("click", () => {
      if (!gameboy.core.cartridgeSlot.cartridge) return;

      util.downloadFile(gameboy.core.cartridgeSlot.cartridge.name + ".sav", gameboy.getBatteryFileArrayBuffer());
    });

    uploadSaveInput.addEventListener("change", async () => {
      if (!gameboy.core.cartridgeSlot.cartridge) return;

      const file = uploadSaveInput.files[0];
      const result = await util.readBlob(file);
      await gameboy.loadBatteryFileArrayBuffer(result);
    });
  }
}

export default new FabButtons();