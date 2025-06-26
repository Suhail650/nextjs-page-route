import { GetServerSideProps } from "next";
import Head from "next/head";
import ProductContent from "@/components/ProductContent";
import { ProductService } from "@/services/productService";
import { IProduct } from "@/interfaces/product";

interface Props {
  product: IProduct;
}

const ProductDetailPage = ({ product }: Props) => {
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <ProductContent product={product} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params!;
  const id = Number(productId);

  try {
    const product = await ProductService.getProductById(id);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      notFound: true,
      error,
    };
  }
};

export default ProductDetailPage;
