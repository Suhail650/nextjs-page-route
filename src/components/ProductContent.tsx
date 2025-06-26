import DetailedProduct from "@/components/DetailedProduct";
import { IProduct } from "@/interfaces/product";

interface Props {
  product: IProduct;
}

const ProductContent = ({ product }: Props) => {
  return (
    <>
      <DetailedProduct product={product} />;
    </>
  );
};

export default ProductContent;
