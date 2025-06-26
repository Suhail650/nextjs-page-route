import ProductList from "@/components/ProductList";
import React from "react";
import Head from "next/head";

const ProductPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>ShopEase-products</title>
        <meta
          name="description"
          content="Welcome to ShopEase - Discover the best deals!"
        />
      </Head>
      <div className="container py-5">
        <h2 className="text-center mb-4">Our Products</h2>
        <div className="row g-4">
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
