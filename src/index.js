import $ from "jquery";
import GameBoy from "jsgbc-core";
import softwareButtons from "./software-buttons.js";
import keyboardButtons from "./keyboard-buttons.js";
import gamepadButtons from "./gamepad-buttons.js";
import fabButtons from "./fab-buttons.js";

if (window.WebComponentsReady) {
  init();
} else {
  window.addEventListener("WebComponentsReady", init);
}

function init() {
  const $jsGBCui = $("jsgbc-ui");
  const jsGBCui = $jsGBCui.get(0);
  const $screen = $(jsGBCui.screenElement);
  const gameboy = new GameBoy(jsGBCui.lcdElement);

  keyboardButtons.bind(gameboy);
  softwareButtons.bind(gameboy, jsGBCui);
  gamepadButtons.bind(gameboy);
  fabButtons.bind(gameboy);

  $jsGBCui.removeAttr("loading");
}

// import notifier from "./notifier.js";
// import Fullscreen from "jsfullscreen";
// import PointerLock from "jspointerlock";

// notifier.appendTo(document.body);

// const fullscreen = new Fullscreen($screen);
// const pointerLock = new PointerLock($screen);

// gameboy
//   .on("stateLoaded", e => {
//     notifier.notify("Loaded " + e.filename);
//   })
//   .on("stateSaved", e => {
//     notifier.notify("Saved  " + e.filename);
//   });

// $screen.on("dblclick", () => {
//   toggleFullscreen();
// });
//
// fullscreen.on("change", () => {
//   if (fullscreen.isActive) {
//     $screen.addClass("fullscreen");
//   } else {
//     PointerLock.exitPointerLock();
//     $screen.removeClass("fullscreen");
//   }
// });

// $(".upload-state").on("change", function() {
//   if (this.files.length > 0) {
//     const file = this.files[0];
//     const binaryHandle = new FileReader();
//     binaryHandle.onload = () => {
//       if (this.readyState === 2) {
//         gameboy.core.savedStateFileName = file.name;
//         gameboy.core.loadState(JSON.parse(this.result));
//       }
//     };
//     binaryHandle.readAsBinaryString(file);
//   }
// });
//
// $(".download-state").on("click", () => {
//   saveData(gameboy.core.saveState(), gameboy.core.name + ".s0");
// });
//
// var saveData = (function() {
//   var a = document.createElement("a");
//   a.style.display = "none";
//   document.body.appendChild(a);
//
//   return function(data, fileName) {
//     var json = JSON.stringify(data);
//     var blob = new Blob([json], {
//       type: "octet/stream"
//     });
//     var url = window.URL.createObjectURL(blob);
//     a.href = url;
//     a.download = fileName;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };
// })();

// function toggleFullscreen() {
//   if (fullscreen.isActive) {
//     Fullscreen.exitFullscreen();
//     PointerLock.exitPointerLock();
//   } else {
//     fullscreen.requestFullscreen();
//     pointerLock.requestPointerLock();
//   }
// }
