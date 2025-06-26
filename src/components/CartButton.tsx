"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsCartPlus } from "react-icons/bs";
import { addToCart, removeFromCart } from "@/features/cartSlice";
import { RootState } from "@/store/store";
import { ICartButtonProp } from "@/interfaces/product";

const CartButton: React.FC<ICartButtonProp> = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const isInCart = cart.some((item) => item.id === product.id);

  return isInCart ? (
    <button
      className="btn btn-outline-danger mt-auto"
      onClick={() => dispatch(removeFromCart(product.id))}
    >
      <BsCartPlus className="me-2" />
      Remove from Cart
    </button>
  ) : (
    <button
      className="btn btn-outline-primary mt-auto"
      onClick={() => dispatch(addToCart(product))}
    >
      <BsCartPlus className="me-2" />
      Add to Cart
    </button>
  );
};

export default CartButton;
