import React from "react";
import styles from "../../../styles/detailSkeleton.module.css";

const DetailSkeleton: React.FC = () => {
  return (
    <div className="container py-5">
      <div
        className={`${styles.skeletonButton} mb-4`}
        style={{ width: "180px", height: "38px" }}
      ></div>

      <div className="row g-5">
        <div className="col-md-6 text-center">
          <div className={`${styles.skeletonImg} mb-3`}></div>
        </div>
        <div className="col-md-6">
          <div className={`${styles.skeletonLine} mb-3 w-75`}></div>
          <div className={`${styles.skeletonLine} mb-3 w-50`}></div>
          <div
            className={`${styles.skeletonLine} mb-3 w-100`}
            style={{ height: "70px" }}
          ></div>
          <div className={`${styles.skeletonLine} mb-2 w-50`}></div>
          <div className={`${styles.skeletonLine} mb-2 w-50`}></div>

          <div className="d-flex gap-3 mt-4">
            <div
              className={styles.skeletonButton}
              style={{ width: "130px", height: "40px" }}
            ></div>
            <div
              className={styles.skeletonButton}
              style={{ width: "130px", height: "40px" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
