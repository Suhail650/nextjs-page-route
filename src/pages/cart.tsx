import CartItems from "@/components/CartItems";

const Cart: React.FC = () => {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Your Shopping Cart</h2>
      <CartItems />
    </div>
  );
};

export default Cart;
