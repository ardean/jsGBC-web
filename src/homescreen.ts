export type PromptEvent = Event & { prompt(): void };

export class Homescreen {
  promptEvent: PromptEvent;

  async bind() {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("service-worker.js");
      } catch (err) {
        console.log("No it didnt. This happened: ", err)
      }
    }

    return new Promise(resolve => {
      window.addEventListener("beforeinstallprompt", (e: PromptEvent) => {
        e.preventDefault();
        this.promptEvent = e;
        resolve();
      });
    });
  }

  prompt() {
    this.promptEvent.prompt();
  }
}

export default new Homescreen();