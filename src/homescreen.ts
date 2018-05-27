export class Homescreen {
  async bind() {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("service-worker.js");
      } catch (err) {
        console.log("No it didnt. This happened: ", err)
      }
    }

    window.addEventListener("beforeinstallprompt", function (e: Event & { prompt(): void }) {
      e.preventDefault();
      e.prompt();
    });
  }
}

export default new Homescreen();