"use client";

import { removeFromCart, setCartLoading } from "@/features/cartSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { BsBagCheckFill, BsCartX, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import CartSkeleton from "./skeleton/Cart/CartSkeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/product.module.css"; // ✅ Import CSS module

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  useEffect(() => {
    dispatch(setCartLoading(true));
    const timer = setTimeout(() => {
      dispatch(setCartLoading(false));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  if (loading) return <CartSkeleton />;

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        {cart.map((item) => (
          <div key={item.id} className="card mb-3 shadow-sm">
            <div className="row g-0 align-items-center">
              <div className="col-md-2 text-center">
                <div className={styles.productImgWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link
                      className={styles.linkDark}
                      href={`/products/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </h5>
                  <p className="card-text text-muted">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <BsTrash /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        {cart.length === 0 && (
          <div className="alert alert-warning text-center">
            <BsCartX size={24} className="me-2" />
            Your cart is empty.
            <div className="mt-3">
              <Link href="/products" className="btn btn-outline-primary">
                Browse Products
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title">Summary</h4>
            <hr />
            <p className="d-flex justify-content-between">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </p>
            <p className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </p>
            <button
              className={`btn btn-primary w-100 mt-3 ${
                cart.length === 0 ? "disabled" : ""
              }`}
              onClick={() =>
                router.push(`/payment?totalpaymentamount=${totalPrice}`)
              }
            >
              <BsBagCheckFill className="me-2" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
