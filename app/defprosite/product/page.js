"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import pic1 from "../../assets/pic1.svg";
import pic2 from "../../assets/pic2.svg";
import pic3 from "../../assets/pic3.svg";
import pic4 from "../../assets/pic4.svg";
import {
  AiFillDownCircle,
  AiFillUpCircle,
  AiTwotoneStar,
} from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { API } from "@/Essentials";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const page = () => {
  const search = useSearchParams();
  const data = search.get("data");
  const productId  = search.get("productId ");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const parsedData = JSON.parse(data);
  console.log(parsedData, id, "done");
  const addtoCart = async () => {
    setOpen(true);
    try {
      const res = await axios.post(`${API}/addtocart/${id}/${productId}`, {
        quantity: 1,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const i = sessionStorage.getItem("id");
    setId(i);
  }, []);
  return (
    <>
      <div className="p-[2%]">
        <div className="flex justify-center items-center">
          {/* bada aur pura ek grid */}
          <div className=" grid grid-cols-1 p-[2%] md:w-[90%]">
            {/* grid jisme ki usme children ayenge */}
            <div className="grid grid-cols-1 md:grid-cols-7 pn:max-md:gap-3 md:w-[95%]">
              {/* woh wala div jisme three ladki hai ek baad ek */}
              <div className="md:col-span-1 pn:max-md:order-2 p-4 bg-white sm:bg-[#F6F6F6]">
                <div className="flex md:justify-center gap-4 items-center w-full md:flex-col">
                  <div className="max-w-[70px] max-h-[70px]">
                    <Image src={pic4} alt="list" />
                  </div>
                  <div className="max-w-[70px] max-h-[70px]">
                    <Image src={pic2} alt="list" />
                  </div>
                  <div className="max-w-[70px] max-h-[70px]">
                    <Image src={pic3} alt="list" />
                  </div>
                  <div className="flex pn:max-md:hidden flex-col justify-center items-center gap-2">
                    <AiFillUpCircle className="text-xl" />
                    <AiFillDownCircle className="text-xl" />
                  </div>
                </div>
              </div>
              {/* 3 ladki wala div khtm */}

              {/* badi wali ladki wala div */}
              <div className="md:col-span-3 pn:max-md:order-1 bg-blue-600">
                <Image
                  src={pic1}
                  alt="ladki"
                  className="min-w-full w-full pn:max-sm:max-h-[400px]"
                />
              </div>
              {/*  badi wali ladki wala div khtm */}

              {/* product name price wala div */}
              <div className="md:col-span-3 pn:max-md:order-3 p-[3%] sm:px-6">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    {/* product name */}
                    <h1 className="sm:text-[27px] text-xl font-semibold text-[#3C4242] leading-snug lg:w-[70%]">
                      Raven Hoodie With
                      <br className="lg:hidden" /> Black colored Design
                    </h1>

                    {/* stars */}
                    <div className="flex gap-2 items-center">
                      <div>
                        <div className="flex items-center gap-2 text-[#EDD146]">
                          <AiTwotoneStar />
                          <AiTwotoneStar />
                          <AiTwotoneStar />
                          <AiTwotoneStar />
                          <AiTwotoneStar />
                        </div>
                      </div>
                      <div className="text-sm">3.5</div>
                    </div>

                    {/* price */}
                    <div className="sm:text-2xl text-xl font-semibold">
                      ₹5999
                    </div>

                    {/* button web wale */}
                    <div className="text-sm flex py-2 pn:max-sm:hidden items-center gap-6">
                      <button
                        onClick={addtoCart}
                        className="flex items-center gap-2  text-white p-2 px-9 rounded-xl bg-black justify-center"
                      >
                        <BsFillCartPlusFill />
                        <p>Add to cart</p>
                      </button>

                      <button className="flex items-center gap-2 bg-white text-black border border-black p-2  px-9 rounded-xl">
                        BUY NOW
                      </button>
                    </div>

                    {/* button mobile wale */}
                    <div className="fixed bottom-0 left-0 w-full bg-white sm:hidden">
                      <div className="bg-white flex justify-center items-center gap-2 p-2 w-full">
                        <button className="text-sm p-3 px-4 text-black bg-white border border-black rounded-xl w-[50%]">
                          BUY NOW
                        </button>
                        <button className="text-sm p-3 px-4 flex justify-center items-center gap-2 text-white bg-black border border-black rounded-xl w-[50%]">
                          <BsFillCartPlusFill />
                          <p>Add to Cart</p>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    // style={{ marginBottom: "10rem" }}
                    className="w-full h-1 pn:max-sm:hidden border-t mt-5 border-black"
                  ></div>

                  {/* product description */}
                  <div>
                    <div>
                      <h1 className="font-semibold py-2 text-sm">
                        Product Description :
                      </h1>
                      <div
                        style={{ marginBottom: "3rem" }}
                        className="font-medium"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Id tortor feugiat nulla ut eu, nullam ac. Arcu sed diam
                        lorem faucibus. Sed auctor sed ut non convallis libero
                        metus, facilisis tincidunt. Viverra magna ut aenean nibh
                        vel aenean mi aliquam. Tristique consequat erat mauris,
                        quis pharetra.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
