import PaymentPage from "@/components/PaymentPage";
import Head from "next/head";
import React, { Suspense } from "react";

export default function payment() {
  return (
    <>
      <Head>
        <title>Payment-Proccessing</title>
      </Head>
      <Suspense fallback={<div>loading payment...</div>}>
        <PaymentPage />
      </Suspense>
    </>
  );
}
