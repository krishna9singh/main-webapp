import React, { useEffect, useState } from "react";
import Image from "next/image";
import box from "../../assets/Images/Box.png";
import Link from "next/link";

function Store(props) {
  const [productt, setProductt] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  console.log(productt);
  useEffect(() => {
    if (props.product) {
      // Simulate a delay (you can replace this with your data fetching logic)
      setTimeout(() => {
        setProductt(props.product);
        setIsLoading(false); // Set loading state to false when data is available
      }, 2000); // Simulate a 2-second delay
    }
  }, [props.product]);
  return (
    <>
      <div className="select-none">
        <div className="text-[21px] font-semibold text-center my-2 py-2">
          Store
        </div>
        <div className="flex justify-center items-center px-3">
          <div className="md:grid md:grid-cols-4 md:gap-6 pn:max-md:flex pn:max-sm:space-y-5 pn:max-sm:flex-col sm:max-md:flex-wrap justify-center items-center px-3">
            {isLoading ? ( // Check if loading is true
              <>
                <div className="flex flex-col justify-center border-[2px] border-[#f9f9f9] h-[410px] rounded-xl max-w-[400px] sm:max-w-[320px] p-4 ">
                  <div className="bg-slate-100 animate-pulse flex justify-center items-center rounded-lg py-3">
                    <div className="h-[170px] w-[200px] flex justify-center items-center "></div>
                  </div>
                  <div className="flex flex-col space-y-1 my-2 text-lg font-medium">
                    <div className="text-base font-semibold h-[20px] rounded-md w-20 bg-slate-100 animate-pulse overflow-hidden "></div>
                    <div className="h-[20px] w-48 bg-slate-100 rounded-md animate-pulse"></div>
                    <div className="h-[20px] w-28 bg-slate-100 rounded-md animate-pulse">
                      <span className="h-[20px] w-20 bg-slate-100 rounded-md animate-pulse"></span>
                    </div>
                    <div className="h-[20px] w-20 bg-slate-100 rounded-md animate-pulse"></div>
                  </div>
                  <button className="text-white bg-slate-100  rounded-2xl flex justify-center items-center space-x-2 h-12 w-full"></button>
                </div>
                <div className="flex flex-col justify-center border-[2px] border-[#f9f9f9] h-[410px] rounded-xl max-w-[400px] sm:max-w-[320px] p-4 ">
                  <div className="bg-slate-100 animate-pulse flex justify-center items-center rounded-lg py-3">
                    <div className="h-[170px] w-[200px] flex justify-center items-center "></div>
                  </div>
                  <div className="flex flex-col space-y-1 my-2 text-lg font-medium">
                    <div className="text-base font-semibold h-[20px] rounded-md w-20 bg-slate-100 animate-pulse overflow-hidden "></div>
                    <div className="h-[20px] w-48 bg-slate-100 rounded-md animate-pulse"></div>
                    <div className="h-[20px] w-28 bg-slate-100 rounded-md animate-pulse">
                      <span className="h-[20px] w-20 bg-slate-100 rounded-md animate-pulse"></span>
                    </div>
                    <div className="h-[20px] w-20 bg-slate-100 rounded-md animate-pulse"></div>
                  </div>
                  <button className="text-white bg-slate-100  rounded-2xl flex justify-center items-center space-x-2 h-12 w-full"></button>
                </div>
                <div className="flex flex-col justify-center border-[2px] border-[#f9f9f9] h-[410px] rounded-xl max-w-[400px] sm:max-w-[320px] p-4 ">
                  <div className="bg-slate-100 animate-pulse flex justify-center items-center rounded-lg py-3">
                    <div className="h-[170px] w-[200px] flex justify-center items-center "></div>
                  </div>
                  <div className="flex flex-col space-y-1 my-2 text-lg font-medium">
                    <div className="text-base font-semibold h-[20px] rounded-md w-20 bg-slate-100 animate-pulse overflow-hidden "></div>
                    <div className="h-[20px] w-48 bg-slate-100 rounded-md animate-pulse"></div>
                    <div className="h-[20px] w-28 bg-slate-100 rounded-md animate-pulse">
                      <span className="h-[20px] w-20 bg-slate-100 rounded-md animate-pulse"></span>
                    </div>
                    <div className="h-[20px] w-20 bg-slate-100 rounded-md animate-pulse"></div>
                  </div>
                  <button className="text-white bg-slate-100  rounded-2xl flex justify-center items-center space-x-2 h-12 w-full"></button>
                </div>
                <div className="flex flex-col justify-center border-[2px] border-[#f9f9f9] h-[410px] rounded-xl max-w-[400px] sm:max-w-[320px] p-4 ">
                  <div className="bg-slate-100 animate-pulse flex justify-center items-center rounded-lg py-3">
                    <div className="h-[170px] w-[200px] flex justify-center items-center "></div>
                  </div>
                  <div className="flex flex-col space-y-1 my-2 text-lg font-medium">
                    <div className="text-base font-semibold h-[20px] rounded-md w-20 bg-slate-100 animate-pulse overflow-hidden "></div>
                    <div className="h-[20px] w-48 bg-slate-100 rounded-md animate-pulse"></div>
                    <div className="h-[20px] w-28 bg-slate-100 rounded-md animate-pulse">
                      <span className="h-[20px] w-20 bg-slate-100 rounded-md animate-pulse"></span>
                    </div>
                    <div className="h-[20px] w-20 bg-slate-100 rounded-md animate-pulse"></div>
                  </div>
                  <button className="text-white bg-slate-100  rounded-2xl flex justify-center items-center space-x-2 h-12 w-full"></button>
                </div>
              </>
            ) : (
              productt.map((d, i) => {
                return productt?.length === 0 ? (
                  <div
                    className="flex flex-col bg-white py-2 w-[100%] h-[70%] justify-evenly items-center space-y-2"
                    key={i}
                  >
                    <div className="flex flex-col pn:max-md:bg-slate-100 mx-8 rounded-2xl justify-center items-center">
                      <div className="flex justify-center items-center h-[60%] w-[60%] py-10">
                        <Image
                          alt="box"
                          src={box}
                          className="md:h-[60%] h-90%] w-90%] md:w-[60%] object-contain"
                        />
                      </div>
                      <div className=" text-black md:text-[24px] text-[18px] font-semibold">
                        No Products Yet
                      </div>
                      <div className=" text-black text-[14px] font-medium ">
                        Once you add Products, they will appear here!
                      </div>
                      <div className=" w-[240px] my-2 h-[40px] flex justify-center items-center bg-black text-white rounded-2xl hover:scale-105 hover:bg-[#3e3e3e] duration-100 text-[14px] ">
                        Add Product
                      </div>
                    </div>
                  </div>
                ) : productt >= 4 ? (
                  <div
                    key={i}
                    className="flex flex-col justify-center border-[2px] border-[#f9f9f9] h-[410px] rounded-xl max-w-[400px] sm:max-w-[320px] p-4 "
                  >
                    <div className="bg-[#f9f9f9] flex justify-center items-center rounded-lg py-3">
                      <div className="h-[170px] w-[200px] flex justify-center items-center ">
                        <img
                          src={d?.u}
                          alt="img"
                          className="w-[100px] h-[170px] "
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 my-2 text-lg font-medium">
                      <div className="text-base font-semibold h-[20px] overflow-hidden ">
                        {d?.p?.name}
                      </div>
                      <div className="text-[#737373] text-[14px]">
                        Sold by {d?.p?.creator?.fullname}
                      </div>
                      <div className="text-[17px] font-semibold">
                        ₹ {d?.p?.discountedprice}
                        <span className="text-base p-2 font-medium text-[#5585FF]">
                          {d?.p?.percentoff}%
                        </span>
                      </div>
                      <div className="font-semibold">
                        M.R.P:
                        <del className="font-medium p-2 text-[#FF0000]">
                          ₹ {d?.p?.price}
                        </del>
                      </div>
                    </div>
                    <Link
                      href={{
                        pathname: "../../defprosite/product",
                        query: {
                          data: productt,
                        },
                      }}
                      className="text-white bg-black rounded-2xl flex justify-center items-center space-x-2 h-12 w-full"
                    >
                      view
                    </Link>
                  </div>
                ) : (
                  <div
                    key={i}
                    className="flex flex-col justify-center border-[2px] border-[#f9f9f9] h-[410px] rounded-xl max-w-[400px] sm:max-w-[320px] p-4 "
                  >
                    <div className="bg-[#f9f9f9] flex justify-center items-center rounded-lg py-3">
                      <div className="h-[170px] w-[200px] flex justify-center items-center ">
                        <img
                          src={d?.u}
                          alt="img"
                          className="w-[100px] h-[170px] "
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 my-2 text-lg font-medium">
                      <div className="text-base font-semibold h-[20px] overflow-hidden ">
                        {d?.p?.name}
                      </div>
                      <div className="text-[#737373] text-[14px]">
                        Sold by {d?.p?.creator?.fullname}
                      </div>
                      <div className="text-[17px] font-semibold">
                        ₹ {d?.p?.discountedprice}
                        <span className="text-base p-2 font-medium text-[#5585FF]">
                          {d?.p?.percentoff}%
                        </span>
                      </div>
                      <div className="font-semibold">
                        M.R.P:
                        <del className="font-medium p-2 text-[#FF0000]">
                          ₹ {d?.p?.price}
                        </del>
                      </div>
                    </div>
                    <button className="text-white bg-black rounded-2xl flex justify-center items-center space-x-2 h-12 w-full">
                      view
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
