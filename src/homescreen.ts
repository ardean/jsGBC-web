export type PromptEvent = Event & { prompt(): void, userChoice: Promise<any> };

export class Homescreen {
  promptEvent: PromptEvent;

  async bind() {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/jsGBC-web/service-worker.js", { scope: "/jsGBC-web/" });
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

  async prompt() {
    this.promptEvent.prompt();
    return await this.promptEvent.userChoice;
  }
}

export default new Homescreen();