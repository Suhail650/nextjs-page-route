"use client";

import React from "react";
import { IProduct } from "@/interfaces/product";
import { BsCreditCard, BsArrowLeft } from "react-icons/bs";
import CartButton from "@/components/CartButton";
import Image from "next/image";
import { useRouter } from "next/router";

interface Prop {
  product: IProduct
}

export default function DetailedProduct(props :Prop) {
  const product: IProduct = props.product;
  const router = useRouter();

  if (!product) {
    return <div className="container py-5 text-danger">Product not found.</div>;
  }

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => router.back()}
      >
        <BsArrowLeft className="me-2" />
        Back to Products
      </button>

      <div className="row g-5">
        <div className="col-md-6 text-center">
          <Image
            height={400}
            width={400}
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{product.title}</h2>
          <h4 className="text-primary mb-3">₹{product.price.toFixed(2)}</h4>
          <p className="text-muted">{product.description}</p>
          <p className="mb-2">
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {product.rating.rate} / 5 (
            {product.rating.count} reviews)
          </p>

          <div className="d-flex gap-3 mt-4">
            <CartButton product={product} />
            <button
              className="btn btn-success"
              onClick={() =>
                router.push(`/payment?totalpaymentamount=${product.price}`)
              }
            >
              <BsCreditCard className="me-2" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
