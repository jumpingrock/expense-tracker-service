export class Version {
  private readonly _appVersion: string;

  constructor (appVersion: string) {
    this._appVersion = appVersion;
  }

  get appVersion (): string {
    return this._appVersion;
  }
}
