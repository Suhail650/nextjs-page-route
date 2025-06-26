import { ServiceBase } from "./serviceBase";

export class ProductService extends ServiceBase {
  static getAllProducts = async () => {
    const response = await fetch(this.getUrl("/products"));
    const data = await response.json();
    return data;
  };

  static getLimitedProducts = async () => {
    const response = await fetch(this.getUrl("/products?limit=4"), {
      next: {
        revalidate: 3600,
      },
    });
    const data = await response.json();
    return data;
  };

  static getProductById = async (id: number) => {
    const response = await fetch(this.getUrl(`/products/${id}`), {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  };
}
