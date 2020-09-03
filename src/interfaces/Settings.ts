interface Settings {
  use24Hour: boolean,
  degreesFormat: string,
  thermInterval: number,
}

class Settings {
  [indexSignature: string]: any;
  constructor(use24Hour?: boolean, degreesFormat?: string, thermInterval?: number) {
    this.use24Hour = use24Hour || true;
    this.degreesFormat = degreesFormat || 'Fahrenheit';
    this.thermInterval = thermInterval || 289;
  }

  init(): void {
    const settings: string | null = localStorage.getItem('ThermSettings');
    if (settings) {
      const parsedSettings: Settings = JSON.parse(settings);
      this.use24Hour = parsedSettings.use24Hour;
      this.degreesFormat = parsedSettings.degreesFormat;
      this.thermInterval = parsedSettings.thermInterval;
    } else {
      const stringifiedSettings: string = JSON.stringify(this);
      localStorage.setItem('ThermSettings', stringifiedSettings);
    }
  }

  update({ use24Hour, degreesFormat, thermInterval }: Settings): void {
    this.use24Hour = use24Hour;
    this.degreesFormat = degreesFormat;
    this.thermInterval = thermInterval;
    this.saveSettings();
  }

  saveSettings(): void {
    const settings = JSON.stringify(this);
    localStorage.setItem('ThermSettings', settings);
  }
}

export default Settings;