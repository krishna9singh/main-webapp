"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export default function LibraryLayout({ children }) {
  const [value, setValue] = useState(1);

  // const handleProceed = async () => {
  //   try {
  //     if (address && total > 0) {
  //       let options = {
  //         description: "Purchase",
  //         currency: "INR",
  //         key: "rzp_test_dKoq1kt4NbYzD4",
  //         amount: total * 100,
  //         name: "Grovyo Platforms",
  //         prefill: {
  //           id: id,
  //           name: fullname,
  //         },
  //         theme: { color: theme ? bluedark : bluelight },
  //       };
  //       const res = await axios.post(`${API}/createcartorder/${id}`, {
  //         quantity: quantity,
  //         total: total,
  //         productId: pids,
  //         deliveryCharges: 40,
  //       });
  //       RazorpayCheckout.open(options)
  //         .then((data) => {
  //           const Final = async () => {
  //             const re = await axios.post(
  //               `${API}/updatecartorder/${id}/${res?.data?.orderId}`,
  //               {
  //                 paymentId: data.razorpay_payment_id,
  //                 success: "success",
  //                 paymentmode: "online",
  //               }
  //             );
  //             if (re?.data?.success) {
  //               fetchCart();
  //               setToast({
  //                 appear: true,
  //                 text: "Order Placed successfully.",
  //                 success: true,
  //               });
  //               setTimeout(() => {
  //                 setToast({ appear: false });
  //               }, 5000);
  //             }
  //           };
  //           Final();
  //         })
  //         .catch((error) => {
  //           const Final = async () => {
  //             const re = await axios.post(
  //               `${API}/updatecartorder/${id}/${res?.data?.orderId}`,
  //               {
  //                 success: "fail",
  //                 paymentmode: "online",
  //               }
  //             );

  //             setToast({
  //               appear: true,
  //               text: "Something went wrong...",
  //               success: false,
  //             });
  //             setTimeout(() => {
  //               setToast({ appear: false });
  //             }, 5000);
  //           };
  //           Final();
  //         });
  //     } else if (total < 0) {
  //       setToast({
  //         appear: true,
  //         text: "Add Someitems to Cart first.",
  //         success: false,
  //       });
  //       setTimeout(() => {
  //         setToast({ appear: false });
  //       }, 2000);
  //     } else if (!address) {
  //       nav.navigate("UpdateAddress", { id });
  //     } else {
  //       setToast({
  //         appear: true,
  //         text: "Something went wrong...",
  //         success: false,
  //       });
  //       setTimeout(() => {
  //         setToast({ appear: false });
  //       }, 2000);
  //     }
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className="flex flex-row bg-white h-screen w-[100%]">
      {/* chats */}
      <div className="h-[100vh] pn:max-md:h-[100vh] select-none pn:max-md:w-[100%] w-[100%] flex flex-col items-start  md:border-r-2 border-[#f7f7f7] overflow-auto scrollbar-hide ">
        {/* header */}
        <div className="md:h-[100px] py-2 border-b-[1px] bg-white pn:max-sm:fixed top-14 md:min-w-[390px] md:[360px] pn:max-md:w-[100%] flex flex-col">
          <div
            className="h-[50%] w-[100%] 
           flex flex-col text-black text-[20px] font-bold px-4 py-2 justify-end"
          >
            Library
          </div>
          <div className="h-[50%] w-[100%]  text-black  flex flex-row justify-evenly items-center">
            <Link
              href={{
                pathname: "../../main/library/Cart",
              }}
              onClick={() => {
                setValue(1);
              }}
              className={`font-medium ${
                value === 1
                  ? "flex justify-center items-center py-2 bg-[#0075FF] text-white rounded-2xl text-[12px] px-4"
                  : "flex justify-center text-[#3e3e3e] items-center py-2 bg-[#f9f9f9]  rounded-2xl text-[12px] px-4"
              }`}
            >
              Cart
            </Link>
            <Link
              href={{
                pathname: "../../main/library/Track",
              }}
              onClick={() => {
                setValue(2);
              }}
              className={`font-medium ${
                value === 2
                  ? "flex justify-center items-center py-2 bg-[#0075FF] text-white rounded-2xl text-[12px] px-4"
                  : "flex justify-center text-[#3e3e3e] items-center py-2 bg-[#f9f9f9]  rounded-2xl text-[12px] px-4"
              }`}
            >
              Track Order
            </Link>
            <Link
              href="../../main/library/Address"
              onClick={() => {
                setValue(3);
              }}
              className={`font-medium ${
                value === 3
                  ? "flex justify-center items-center py-2 bg-[#0075FF] text-white  rounded-2xl text-[12px] px-4"
                  : "flex justify-center text-[#3e3e3e] items-center py-2 bg-[#f9f9f9]  rounded-2xl text-[12px] px-4"
              }`}
            >
              Order History
            </Link>
          </div>
        </div>
        <div className="h-[90vh] w-[100%]">{children}</div>
      </div>
    </div>
  );
}
