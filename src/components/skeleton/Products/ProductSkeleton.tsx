import React from "react";
import styles from "@/styles/skeleton.module.css";

const ProductSkeleton: React.FC = () => {
  const skeletonArray = new Array(8).fill(0);

  return (
    <>
      {skeletonArray.map((_, index) => (
        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm border border-secondary border-opacity-10 border-2">
            <div className={styles.skeletonImgWrapper}></div>
            <div className="card-body">
              <div className={`${styles.skeletonLine} w-75 mb-2`}></div>
              <div className={`${styles.skeletonLine} w-50 mb-3`}></div>
              <div className="d-flex mb-3">
                <div className={`${styles.skeletonIcon} me-2`}></div>
                <div className={`${styles.skeletonIcon} me-2`}></div>
                <div className={`${styles.skeletonIcon} me-2`}></div>
                <div className={`${styles.skeletonIcon} me-2`}></div>
                <div className={styles.skeletonIcon}></div>
              </div>
              <div className={`${styles.skeletonButton} w-100`}></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;
