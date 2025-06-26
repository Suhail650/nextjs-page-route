import Head from "next/head";
import Link from "next/link";
import { IProduct } from "@/interfaces/product";
import { ProductService } from "@/services/productService";
import Image from "next/image";
import styles from "../styles/home.module.css";

interface HomeProps {
  limitedProducts: IProduct[];
}

export default function Home({ limitedProducts }: HomeProps) {
  return (
    <>
      <Head>
        <title>ShopEase</title>
        <meta
          name="description"
          content="Welcome to ShopEase - Discover the best deals!"
        />
      </Head>

      <div>
        {/* Hero Section */}
        <div className="bg-secondary text-white text-center py-5">
          <h1 className="animate__animated animate__fadeInDown">
            Welcome to ShopEase
          </h1>
          <p className="lead animate__animated animate__fadeInUp animate__delay-1s">
            Discover the best deals on your favorite products!
          </p>
          <Link
            href="/products"
            className="btn btn-primary mt-3 animate__animated animate__zoomIn animate__delay-2s"
          >
            Shop Now
          </Link>
        </div>

        {/* Carousel */}
        <div
          id="promoCarousel"
          className="carousel carousel-dark slide my-5 container"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner border rounded bg-light overflow-hidden shadow">
            {limitedProducts.map((product, index) => (
              <div
                key={product.id}
                className={`carousel-item ${index === 0 ? "active" : ""} ${
                  styles.carouselItem
                }`}
              >
                <Image
                  src={product.image}
                  className="d-block w-100"
                  alt={product.title}
                  height={100}
                  width={100}
                  style={{
                    padding: "20px",
                    backgroundColor: "#fff",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#promoCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#promoCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Featured Products */}
        <div className="container my-5">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row">
            {limitedProducts.map((item) => (
              <div key={item.id} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <Image
                    src={item.image}
                    height={100}
                    width={100}
                    className="card-img-top p-4 object-fit-contain h-75"
                    alt="Product"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">$ {item.price}</p>
                    <Link
                      href={`/products/${item.id}`}
                      className="btn btn-outline-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="bg-dark text-white text-center py-3">
          &copy; 2025 ShopEase. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const limitedProducts: IProduct[] = await ProductService.getLimitedProducts();

  return {
    props: {
      limitedProducts,
    },
  };
}
