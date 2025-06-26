export abstract class ServiceBase {
  static url = "https://fakestoreapi.com";
  static getUrl(path: string) {
    return this.url + path;
  }
}
