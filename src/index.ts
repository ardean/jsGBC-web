import * as $ from "jquery";
import GameBoy from "jsgbc";
import softwareButtons from "./software-buttons";
import keyboardButtons from "./keyboard-buttons";
import gamepadButtons from "./gamepad-buttons";
import Fullscreen from "jsfullscreen";
import PointerLock from "jspointerlock";
import fileButtons from "./file-buttons";
import notifier from "./notifier";
import homescreen from "./homescreen";

if (window.WebComponentsReady) {
  init();
} else {
  window.addEventListener("WebComponentsReady", init);
}

async function init() {
  const $jsGBCui = $("jsgbc-ui");
  const jsGBCui = $jsGBCui.get(0) as any;
  const $screen = $(jsGBCui.screenElement);
  const gameboy = new GameBoy(jsGBCui.lcdElement);
  const fullscreen = new Fullscreen($screen);
  const pointerLock = new PointerLock($screen);

  fullscreen.on("change", () => {
    if (fullscreen.isActive) {
      jsGBCui.fullscreen = true;
    } else {
      PointerLock.exitPointerLock();
      jsGBCui.fullscreen = false;
    }
  });

  $screen.on("dblclick", () => {
    toggleFullscreen();
  });

  keyboardButtons.bind(gameboy);
  softwareButtons.bind(gameboy, jsGBCui);
  gamepadButtons.bind(gameboy);
  fileButtons.bind(gameboy);
  notifier.bind(gameboy);
  notifier.appendTo(jsGBCui.screenElement);

  jsGBCui.loading = false;

  homescreen.bind().then(() => {
    ask();
  });

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

function ask() {
  const element = document.querySelector(".ribbon") as HTMLElement;
  element.textContent = "Add to Homescreen";
  element.addEventListener("click", e => {
    e.preventDefault();
    homescreen.prompt();
  });
}