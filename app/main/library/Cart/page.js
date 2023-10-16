"use client";
import React, { useCallback, useEffect, useState } from "react";
import cart from "../../../assets/Images/Cart.png";
import Image from "next/image";
import cloth from "../../../assets/Images/cloth.png";
import area from "../../../assets/Images/Livearea.png";
import change from "../../../assets/Images/change.png";
import { useSearchParams } from "next/navigation";
import delivery from "../../../assets/Images/delivery.png";
import coupon from "../../../assets/Images/coupon.png";
import axios from "axios";
import { API } from "@/Essentials";
import useRazorpay from "react-razorpay";
import { MdDelete } from "react-icons/md";

function page() {
  const [data, setData] = useState([]);
  const [pids, setPids] = useState();
  const [quantity, setQuantity] = useState(0);
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(false);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState();
  const [Razorpay] = useRazorpay();
  const [up, setUp] = useState(false);

  const fetchCart = useCallback(
    async (i) => {
      try {
        const res = await axios.get(`${API}/fetchcart/${i}`);

        if (res?.data?.success) {
          const cart = res?.data?.cart;
          const imgs = res?.data?.image;
          setPids(res?.data?.ids);
          setQuantity(imgs?.length);
          const merge = cart?.map((c, i) => ({ c, image: imgs[i] }));
          setData(merge);
          setAddress(res?.data?.address);
          setTotal(res?.data?.total[0]);
          setLoad(true);
        } else {
          setLoad(false);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [id]
  );

  useEffect(() => {
    const i = sessionStorage.getItem("id");
    setId(i);
    fetchCart(i);
  }, [fetchCart]);

  const removeItem = async (i) => {
    try {
      const a = res?.data?.c?._id;
      const res = await axios.post(`${API}/removecart/${id}/${i.a}`);
      if (res?.data?.success) {
        const update = data.filter((_, a) => a !== i.index);
        setData(update);
        setTotal(total - i.cost);
      } else {
        console.log("failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Conditional rendering when 'productt' is empty or undefined
  const handlePayment = useCallback(
    async (e) => {
      e.preventDefault();
      const name = sessionStorage.getItem("fullname");
      const id = sessionStorage.getItem("id");
      console.log(data?.length);
      if (id && name) {
        try {
          const response = await axios.post(`${API}/createcartorder/${id}`, {
            quantity: 1,
            total: 100,
            productId: pids,
            deliveryCharges: 40,
          });

          if (response.data.success === true) {
            const options = {
              key: "rzp_test_lD67Bc4TAAnHOv",
              amount: inp * 100,
              currency: "INR",
              name: "Grovyo Platforms",
              description: "Test Transaction",
              image: "https://example.com/your_logo",

              handler: function (response) {
                if (response.razorpay_payment_id) {
                  console.log("Payment successful!");
                  const Final = async () => {
                    const re = await axios.post(
                      `${API}/updatecartorder/${id}/${res?.data?.orderId}`,
                      {
                        paymentId: data.razorpay_payment_id,
                        success: "success",
                        paymentmode: "online",
                      }
                    );
                    if (re?.data?.success) {
                      fetchCart();
                      setToast({
                        appear: true,
                        text: "Order Placed successfully.",
                        success: true,
                      });
                      setTimeout(() => {
                        setToast({ appear: false });
                      }, 5000);
                    }
                  };
                  Final();
                } else {
                  const Final = async () => {
                    const re = await axios.post(
                      `${API}/updatecartorder/${id}/${res?.data?.orderId}`,
                      {
                        success: "fail",
                        paymentmode: "online",
                      }
                    );
                  };
                  Final();
                }
              },
              prefill: {
                name: name,
                email: "-",
                contact: "-",
              },
              notes: {
                address: "India",
              },
              theme: {
                color: "#313c58",
              },
            };

            const rzpay = new Razorpay(options);
            rzpay.open();
          } else {
            console.log("Add money request failed.");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Something went wrong...");
      }
    },
    [Razorpay]
  );

  return (
    <div className="md:flex bg-[#ececec] h-[91vh] ">
      {data.length === 0 ? (
        <div className="pn:max-md:w-[100%] md:min-w-[390px] pn:max-md:h-[100%] bg-[#f5f5f5] border-r-2 border-[#f9f9f9] flex items-center flex-col">
          <div className="h-[100%] w-[100%] flex items-center flex-col justify-center ">
            <Image
              alt="cart"
              src={cart}
              className="h-[250px] w-[250px] mt-10"
            />
            <div className="text-black text-[27px] font-sans font-bold mt-2 mb-2">
              Your Cart is Empty
            </div>
            <div className="text-[#9E9E9E] text-[16px] font-sans ">
              Looks like you haven’t added
            </div>
            <div className="text-[#9E9E9E] text-[16px] font-sans ">
              anything to your cart yet
            </div>
            <div className="text-white p-2 text-[14px] mt-3 px-4 bg-[#307EF4] rounded-3xl flex justify-center items-center">
              Go Shop
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:h-[100%] py-6 pn:max-md:w-[100%] md:min-w-[390px] pn:max-sm:pt-40 bg-[#eccfcf] flex items-center flex-col">
          <div
            onClick={() => {
              setUp(false);
            }}
            className="h-[40px] w-[90%] justify-between flex items-center"
          >
            <div className="text-black font-bold">Order Summary</div>
            <div className="text-[14px] font-bold">{data?.length} items</div>
          </div>
          {/* product */}
          {data.map((d, e) => (
            <div
              key={e}
              className="w-[90%] h-[110px] py-1 justify-center bg-white flex flex-col mt-1 rounded-lg items-center"
            >
              <div className="w-[95%] h-[100%] bg-white mt-2 flex flex-row items-center justify-between">
                <div className="flex">
                  <img
                    alt="image"
                    src={d?.image}
                    className="bg-contain h-[90px] w-[90px] bg-[#f9f9f9]"
                  />
                  <div className="flex flex-col text-black bg-white px-2">
                    <div className="text-[14px] font-semibold">
                      {d?.c?.product?.name}
                    </div>
                    <div className="text-[10px] font-semibold py-1">
                      sold by {d?.c?.product?.sellername}
                    </div>
                    <div className="flex flex-row  items-center">
                      <div className="text-[14px]">
                        {d?.c?.product?.discountedprice}
                      </div>
                      <strike className="text-[12px] text-[#A1A1A1] px-1">
                        {d?.c?.product?.price}
                      </strike>
                      <div className="text-[8px] text-[#B858ED] px-1">
                        {d?.c?.product?.percentoff}% Off
                      </div>
                    </div>
                    <div className="flex flex-row justify-between px-2 items-center rounded-lg bg-[#F6F6F6] h-[30px] w-[120px]">
                      <div className="bg-[#fefefe] rounded-md text-black text-[20px] h-[20px] flex justify-center items-center w-[20px]">
                        -
                      </div>
                      <div className=" text-black text-[14px]">
                        {d?.c?.quantity}
                      </div>
                      <div className="bg-[#fefefe] rounded-md text-black text-[20px] h-[20px] flex justify-center items-center w-[20px]">
                        +
                      </div>
                    </div>
                  </div>
                </div>
                <MdDelete
                  onClick={removeItem}
                  className="h-6 w-6 text-[#3e3e3e]"
                />
              </div>
            </div>
          ))}

          {/* button for bill */}
          <div
            className="bg-[#fff] md:hidden  sm:max-md:w-[80%] shadow-3xl sm:max-md:rounded-xl fixed bottom-14 w-full py-4 px-4 rounded-t-xl flex justify-between items-center
           "
          >
            {data.map((d, i) => (
              <div key={i} className="font-bold text-[16px]">
                ₹ {d?.c?.product?.price}
              </div>
            ))}
            <div
              onClick={() => {
                setUp(!up);
              }}
              className="py-2 flex justify-center items-center bg-[#171717] text-[#fff] rounded-xl px-6"
            >
              Place order
            </div>
          </div>
          <div
            className={`duration-500 ${
              up
                ? "h-[70%] shadow-xl ring-1 ring-[#f1f1f1] rounded-t-lg bg-[#fff] md:hidden  sm:max-md:w-[90%] shadow-3xl w-full absolute bottom-0"
                : "h-[70%] rounded-t-lg bg-[#fff] md:hidden  sm:max-md:w-[90%] shadow-3xl w-full absolute -bottom-[100vh]"
            }`}
          >
            {data.map((d, i) => (
              <div
                className="w-[100%] space-y-9 my-4 bg-white flex flex-col items-center  "
                key={i}
              >
                {/* No charges */}
                <div className=" h-[10%] rounded-lg flex flex-row items-center justify-center">
                  <div className="text-[20px] text-[#2D2D2D] font-bold px-1">
                    Place order
                  </div>
                </div>

                {/* Apply coupon */}

                <div className="w-[80%] h-[15%] flex flex-col items-center justify-center">
                  <div className="w-[100%] h-[50%] font-bold text-black text-[18px] bg-white  flex items-center">
                    Have a Coupon?
                  </div>

                  {/* Add coupon */}
                  <div className="w-[80%] h-[50%] font-bold text-black text-[20px] justify-between items-center bg-[#F6F6F6] border-[#D2D2D2] rounded-lg border-2 flex flex-row">
                    <div className="m-1 h-[100%] flex items-center justify-center ">
                      <Image
                        src={coupon}
                        alt="coupon"
                        className="h-[30px] w-[20px]"
                      />
                    </div>

                    <input
                      placeholder="Enter Coupon Code"
                      className="text-[#737373] font-sans outline-none h-[100%] text-[16px] font-thin bg-[#F6F6F6] "
                    />
                    <div className="text-[#0075FF] p-1 h-[100%] text-[16px] flex items-center justify-center ">
                      APPLY
                    </div>
                  </div>
                </div>

                {/* Price details*/}
                <div className="w-[90%] space-y-1 h-[55%] bg-white flex flex-col justify-between">
                  <div className="text-[16px] font-semibold text-black">
                    PRICE DETAILS ({d?.c?.quantity} items)
                  </div>
                  {/* MRP */}
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-[#737373] text-[14px]">Total MRP</div>
                    <div className="text-black text-[14px]">
                      Rs. {d?.c?.product?.price}
                    </div>
                  </div>

                  {/* Discount */}
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-[#737373] text-[14px]">
                      Discount on MRP
                    </div>
                    <div className="text-[#2DC071] text-[14px]">-Rs. </div>
                  </div>

                  {/* Coupon Discount */}

                  <div className="flex flex-row justify-between items-center">
                    <div className="text-[#737373] text-[14px]">
                      Coupon Discount
                    </div>
                    <div className="text-black text-[14px]">Rs. 0</div>
                  </div>

                  {/* delivery charge */}

                  <div className="flex flex-row justify-between items-center">
                    <div className="text-[#737373] text-[14px]">
                      Delivery Charge
                    </div>
                    <div className="text-[#2DC071] text-[14px]">Free</div>
                  </div>

                  {/* Total charge */}
                  <div className="border-t-2 flex flex-row justify-between items-center py-2 bg">
                    <div className="text-[#737373] text-[14px]">
                      Total Amount
                    </div>
                    <div className="text-black font-bold text-[14px]">
                      Rs. {d?.c?.product?.discountedprice}
                    </div>
                  </div>

                  <div
                    onClick={handlePayment}
                    className="bg-black rounded-lg flex flex-row justify-center items-center py-3"
                  >
                    <div className="text-white text-[14px]">PLACE ORDER</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* out */}
      {data.length === 0 ? (
        // Render content when data is empty
        <div className=" bg-white pn:max-md:hidden w-[100%] h-[100%] flex  flex-col items-center justify-evenly ">
          {/* No charges */}
          <div className="w-[80%] h-[10%] bg-[#f9f9f9] rounded-lg flex flex-row items-center justify-center">
            <Image
              src={delivery}
              alt="delivery"
              className="h-[30px] w-[30px] "
            />
            <div className="text-[18px] text-[#2D2D2D] px-1">Yay!</div>
            <div className="text-[18px] text-[#2D2D2D]  font-semibold">
              No Delivery Charge
            </div>
            <div className="text-[18px] text-[#2D2D2D] px-1">on this order</div>
          </div>

          {/* Apply coupon */}

          {/* <div className="w-[60%] h-[15%] flex flex-col items-center justify-center">
            <div className="w-[100%] h-[50%] font-bold text-black text-[18px] bg-white  flex items-center">
              Have a Coupon?
            </div> */}

          {/* Add coupon */}
          {/* <div className="w-[100%] h-[50%] font-bold text-black text-[20px] bg-[#F6F6F6] border-[#D2D2D2] rounded-lg border-2 flex flex-row">
              <div className="w-[10%] h-[100%] flex items-center justify-center ">
                <Image src={coupon} className="h-[30px] w-[20px]" />
              </div>

              <div className="text-[#737373] font-sans w-[70%] flex items-center h-[100%] text-[16px] font-thin bg-[#F6F6F6] ">
                Enter Coupon Code
              </div>
              <div className="text-[#0075FF] w-[20%] h-[100%] text-[16px] flex items-center justify-center ">
                APPLY
              </div>
            </div>
          </div> */}

          {/* Price details*/}
          <div className="w-[60%] h-[55%] bg-white flex flex-col justify-between">
            <div className="text-[16px] font-semibold text-black">
              PRICE DETAILS
            </div>
            {/* MRP */}
            <div className="flex flex-row justify-between items-center">
              <div className="text-[#737373] text-[14px]">Total MRP</div>
              <div className="text-black text-[14px]">Rs. 0</div>
            </div>

            {/* Discount */}
            <div className="flex flex-row justify-between items-center">
              <div className="text-[#737373] text-[14px]">Discount on MRP</div>
              <div className="text-[#2DC071] text-[14px]">-Rs. 0</div>
            </div>

            {/* Coupon Discount */}

            <div className="flex flex-row justify-between items-center">
              <div className="text-[#737373] text-[14px]">Coupon Discount</div>
              <div className="text-black text-[14px]">Rs. 0</div>
            </div>

            {/* delivery charge */}

            <div className="flex flex-row justify-between items-center">
              <div className="text-[#737373] text-[14px]">Delivery Charge</div>
              <div className="text-[#2DC071] text-[14px]">Free</div>
            </div>

            {/* Total charge */}
            <div className="border-t-2 flex flex-row justify-between items-center py-2 bg">
              <div className="text-[#737373] text-[14px]">Total Amount</div>
              <div className="text-black font-bold text-[14px]">Rs. 0</div>
            </div>

            <div className="bg-black rounded-lg flex flex-row justify-center items-center py-3 ">
              <div className="text-white text-[14px]">PLACE ORDER</div>
            </div>
          </div>
        </div>
      ) : (
        data.map((d, t) => (
          <div
            className="w-[100%] pn:max-md:hidden bg-white flex flex-col items-center justify-evenly "
            key={t}
          >
            {/* No charges */}
            <div className="w-[80%] h-[10%] bg-[#f9f9f9] rounded-lg flex flex-row items-center justify-center">
              <Image
                src={delivery}
                alt="delivery"
                className="h-[30px] w-[30px] "
              />
              <div className="text-[18px] text-[#2D2D2D] px-1">Yay!</div>
              <div className="text-[18px] text-[#2D2D2D]  font-semibold">
                No Delivery Charge
              </div>
              <div className="text-[18px] text-[#2D2D2D] px-1">
                on this order
              </div>
            </div>

            {/* Apply coupon */}
            {/* <div className="w-[60%] h-[15%] flex flex-col items-center justify-center">
              <div className="w-[100%] h-[50%] font-bold text-black text-[18px] bg-white  flex items-center">
                Have a Coupon?
              </div>

            
              <div className="w-[100%] h-[50%] font-bold text-black text-[20px] bg-[#F6F6F6] border-[#D2D2D2] rounded-lg border-2 flex flex-row">
                <div className="w-[10%] h-[100%] flex items-center justify-center ">
                  <Image
                    src={coupon}
                    alt="coupon"
                    className="h-[30px] w-[20px]"
                  />
                </div>

                <input
                  placeholder="Enter Coupon Code"
                  className="text-[#737373] font-sans outline-none w-[70%] h-[100%] text-[16px] font-thin bg-[#F6F6F6] "
                />
                <div className="text-[#0075FF] w-[20%] h-[100%] text-[16px] flex items-center justify-center ">
                  APPLY
                </div>
              </div>
            </div> */}

            {/* Price details*/}
            <div className="w-[60%] h-[55%] bg-white flex flex-col justify-between">
              <div className="text-[16px] font-semibold text-black">
                PRICE DETAILS ({d?.c?.quantity} items)
              </div>
              {/* MRP */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">Total MRP</div>
                <div className="text-black text-[14px]">
                  Rs. {d?.c?.product?.price}
                </div>
              </div>

              {/* Discount */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">
                  Discount on MRP
                </div>
                <div className="text-[#2DC071] text-[14px]">-Rs. </div>
              </div>

              {/* Coupon Discount */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">
                  Coupon Discount
                </div>
                <div className="text-black text-[14px]">Rs. 0</div>
              </div>

              {/* delivery charge */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">
                  Delivery Charge
                </div>
                <div className="text-[#2DC071] text-[14px]">Free</div>
              </div>

              {/* Total charge */}
              <div className="border-t-2 flex flex-row justify-between items-center py-2 bg">
                <div className="text-[#737373] text-[14px]">Total Amount</div>
                <div className="text-black font-bold text-[14px]">
                  Rs. {d?.c?.product?.discountedprice}
                </div>
              </div>

              <div
                onClick={handlePayment}
                className="bg-black rounded-lg flex flex-row justify-center items-center py-3"
              >
                <div className="text-white text-[14px]">PLACE ORDER</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default page;
