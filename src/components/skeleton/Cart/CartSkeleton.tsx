import React from "react";
import styles from "../../../styles/cartSkeleton.module.css";

const CartSkeleton: React.FC = () => {
  return (
    <div className="row g-4">
      <div className="col-lg-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="card mb-3 shadow-sm">
            <div className="row g-0 align-items-center p-2">
              <div className="col-md-2 text-center">
                <div className={styles.skeletonImg}></div>
              </div>
              <div className="col-md-7">
                <div className={`${styles.skeletonLine} mb-2 w-75`}></div>
                <div className={`${styles.skeletonLine} w-50`}></div>
              </div>
              <div className="col-md-3 d-flex justify-content-center">
                <div className={`${styles.skeletonButton} w-75`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className={`${styles.skeletonLine} mb-3 w-50`}></div>
            <hr />
            <div className={`${styles.skeletonLine} mb-2 w-100`}></div>
            <div className={`${styles.skeletonLine} mb-2 w-100`}></div>
            <div className={`${styles.skeletonButton} w-100 mt-3`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
