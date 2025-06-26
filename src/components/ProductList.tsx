"use client";

import { IProduct } from "@/interfaces/product";
import { ProductService } from "@/services/productService";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import CartButton from "./CartButton";
import ProductSkeleton from "./skeleton/Products/ProductSkeleton";
import Image from "next/image";
import styles from "../styles/product.module.css"; // 👈 Import the CSS module

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await ProductService.getAllProducts();
      setProducts(res);
    };
    fetchProducts();
  }, []);

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} className="text-warning" />);
    }
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" className="text-warning" />);
    }
    while (stars.length < 5) {
      stars.push(
        <BsStar key={`empty-${stars.length}`} className="text-muted" />
      );
    }
    return stars;
  };

  return (
    <>
      {products.length === 0 ? (
        <ProductSkeleton />
      ) : (
        products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border border-secondary border-opacity-10 border-2">
              <div className={styles.productImgWrapper}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">
                  <Link
                    className={styles.linkDark}
                    href={`/products/${product.id}`}
                  >
                    {product.title}
                  </Link>
                </h5>
                <p className="card-text fw-bold text-primary">
                  ₹{product.price.toFixed(2)}
                </p>
                <div className="d-flex align-items-center mb-2">
                  {renderRatingStars(product.rating.rate)}
                </div>
                <CartButton product={product} />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ProductList;
