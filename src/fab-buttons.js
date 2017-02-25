import $ from "jquery";
import { util } from "jsgbc-core";

class FabButtons {
  bind(gameboy) {
    this.gameboy = gameboy;
    const $fab = $("paper-fab-speed-dial");
    const fab = $fab.get(0);
    const $insertCartridge = $fab.find("#insert-cartridge");
    const $downloadSave = $fab.find("#download-save");
    const $uploadSave = $fab.find("#upload-save");

    $insertCartridge.on("click", async() => {
      fab.close();

      const result = await util.uploadFile(["gb", "gbc"]);
      gameboy.replaceCartridge(result);
    });

    $downloadSave.on("click", () => {
      fab.close();

      if (!gameboy.core.cartridgeSlot.cartridge) return;

      util.downloadFile(gameboy.core.cartridgeSlot.cartridge.name + ".sav", gameboy.getBatteryFileArrayBuffer());
    });

    $uploadSave.on("click", async() => {
      fab.close();

      if (!gameboy.core.cartridgeSlot.cartridge) return;

      const result = await util.uploadFile(["sav"]);
      await gameboy.loadBatteryFileArrayBuffer(result);
    });
  }
}

export default new FabButtons();