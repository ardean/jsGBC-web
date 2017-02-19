import $ from "jquery";

class FabButtons {
  bind(gameboy) {
    this.gameboy = gameboy;
    const $fab = $("paper-fab-speed-dial");
    const fab = $fab.get(0);
    const $insertCartridge = $fab.find("#insert-cartridge");
    const $downloadSave = $fab.find("#download-save");
    const $uploadSave = $fab.find("#upload-save");

    $insertCartridge.on("click", () => {
      fab.close();
      this.requestCartridge();
    });

    $downloadSave.on("click", () => {
      fab.close();

      if (!gameboy.core.cartridgeSlot.cartridge) return;

      this.download(
        gameboy.core.saveState(),
        gameboy.core.cartridgeSlot.cartridge.name + ".s0"
      );
    });

    $uploadSave.on("click", () => {
      fab.close();

      if (!gameboy.core.cartridgeSlot.cartridge) return;

      this.requestSave();
    });
  }

  download(data, filename) {
    const $a = $("<a />");
    $a.css("display", "none");
    $a.appendTo("body");

    const a = $a.get(0);

    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], {
      type: "octet/stream"
    });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    $a.remove();
  }

  requestCartridge() {
    const gameboy = this.gameboy;
    const $input = $("<input type='file' accept='.gb, .gbc' />");
    $input.one("change", function() {
      if (this.files.length > 0) {
        const file = this.files[0];
        const binaryHandle = new FileReader();
        binaryHandle.onload = function() {
          if (this.readyState === 2) {
            gameboy.replaceCartridge(this.result);
          }
        };
        binaryHandle.readAsBinaryString(file);
      }
    });
    $input.click();
  }

  requestSave() {
    const gameboy = this.gameboy;
    const $input = $("<input type='file' accept='.s0' />");
    $input.one("change", function() {
      if (this.files.length > 0) {
        const file = this.files[0];
        const binaryHandle = new FileReader();
        binaryHandle.onload = function() {
          if (this.readyState === 2) {
            const data = JSON.parse(this.result);
            console.log(data);
            gameboy.core.loadState(data);
          }
        };
        binaryHandle.readAsBinaryString(file);
      }
    });
    $input.click();
  }
}

export default new FabButtons();
