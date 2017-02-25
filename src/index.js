import $ from "jquery";
import GameBoy from "jsgbc-core";
import softwareButtons from "./software-buttons.js";
import keyboardButtons from "./keyboard-buttons.js";
import gamepadButtons from "./gamepad-buttons.js";
import Fullscreen from "jsfullscreen";
import PointerLock from "jspointerlock";
import fabButtons from "./fab-buttons.js";
import notifier from "./notifier.js";

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
  const fullscreen = new Fullscreen($screen);
  const pointerLock = new PointerLock($screen);

  fullscreen.on("change", () => {
    if (fullscreen.isActive) {
      $screen.addClass("fullscreen");
    } else {
      PointerLock.exitPointerLock();
      $screen.removeClass("fullscreen");
    }
  });

  $screen.on("dblclick", () => {
    toggleFullscreen();
  });

  keyboardButtons.bind(gameboy);
  softwareButtons.bind(gameboy, jsGBCui);
  gamepadButtons.bind(gameboy);
  fabButtons.bind(gameboy);
  notifier.bind(gameboy);
  notifier.appendTo(jsGBCui.screenElement);

  $jsGBCui.removeAttr("loading");

  function toggleFullscreen() {
    if (fullscreen.isActive) {
      Fullscreen.exitFullscreen();
      PointerLock.exitPointerLock();
    } else {
      fullscreen.requestFullscreen();
      pointerLock.requestPointerLock();
    }
  }
}