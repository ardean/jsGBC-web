export type PromptEvent = Event & { prompt(): void, userChoice: Promise<any> };

export class Homescreen {
  promptEvent: PromptEvent;

  async bind() {
    return new Promise<void>(resolve => {
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