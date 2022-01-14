import { util, GameBoy } from "jsgbc";

export class FabButtons {
  gameboy: GameBoy;

  bind(gameboy: GameBoy) {
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
      const rom = await util.readFirstMatchingExtension(file, file.name, ["gbc", "gb"]);
      gameboy.replaceCartridge(rom);
    });

    downloadSaveButton.addEventListener("click", () => {
      if (!gameboy.core.cartridge) return;

      util.saveAs(gameboy.getBatteryFileArrayBuffer(), gameboy.core.cartridge.name + ".sav");
    });

    uploadSaveInput.addEventListener("change", async () => {
      if (!gameboy.core.cartridge) return;

      const file = uploadSaveInput.files[0];
      const result = await util.readBlob(file);
      await gameboy.loadBatteryFileArrayBuffer(result);
    });
  }
}

export default new FabButtons();