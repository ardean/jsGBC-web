import GameBoy from "jsgbc";
import JsGbcUI from "jsgbc-ui";
import notifier from "./notifier";
import Fullscreen from "jsfullscreen";
import homescreen from "./homescreen";
import PointerLock from "jspointerlock";
import fileButtons from "./fileButtons";
import gamepadButtons from "./gamepadButtons";
import keyboardButtons from "./keyboardButtons";
import softwareButtons from "./softwareButtons";

(async () => {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register(
        "/jsGBC-web/service-worker.js",
        { scope: "/jsGBC-web/" }
      );
    } catch (err) {
      console.error(err);
    }
  }

  const jsGbcUIElement = document.querySelector<HTMLElement>("jsgbc-ui");
  const jsGbcUI = new JsGbcUI(jsGbcUIElement);
  jsGbcUI.setLoading(true);

  const screen = jsGbcUI.innerElement.querySelector<HTMLElement>(".jsgbc-ui-screen");
  const gameboy = new GameBoy({
    lcd: { canvas: jsGbcUI.lcdSlotElement }
  });
  const fullscreen = new Fullscreen(screen);
  const pointerLock = new PointerLock(screen);

  fullscreen.on("change", () => {
    if (fullscreen.isActive) {
      jsGbcUI.setFullscreen(true);
    } else {
      PointerLock.exitPointerLock();
      jsGbcUI.setFullscreen(false);
    }
  });

  screen.addEventListener("dblclick", () => {
    toggleFullscreen();
  });

  keyboardButtons.bind(gameboy);
  softwareButtons.bind(gameboy, jsGbcUI);
  gamepadButtons.bind(gameboy);
  fileButtons.bind(gameboy);
  notifier.bind(gameboy);
  notifier.appendTo(screen);

  jsGbcUI.setLoading(false);

  homescreen.bind().then(() => {
    setAddToHomescreen();
  });

  const ribbonElement = document.querySelector<HTMLElement>(".ribbon");
  let ribbonText = ribbonElement.textContent;

  function setAddToHomescreen() {
    ribbonElement.textContent = "Add to Homescreen";
    ribbonElement.addEventListener("click", addToHomescreen);
    ribbonElement.classList.add("highlighted");
  }

  function unsetAddToHomescreen() {
    ribbonElement.textContent = ribbonText;
    ribbonElement.removeEventListener("click", addToHomescreen);
    ribbonElement.classList.remove("highlighted");
  }

  async function addToHomescreen(e) {
    e.preventDefault();
    await homescreen.prompt();
    unsetAddToHomescreen();
  }

  function toggleFullscreen() {
    if (fullscreen.isActive) {
      Fullscreen.exitFullscreen();
      PointerLock.exitPointerLock();
    } else {
      fullscreen.requestFullscreen();
      pointerLock.requestPointerLock();
    }
  }
})();