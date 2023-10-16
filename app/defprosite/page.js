"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import yupp from "../assets/Images/yupp.png";
import box from "../assets/Images/Box.png";
import wait from "../assets/Images/wait.png";
import logo from "../assets/Images/logo.png";
import bg from "../assets/Images/bg.png";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { API } from "@/Essentials";
import Bio from "../defprosite/component/Bio";
import Community from "../defprosite/component/Community";
import Store from "../defprosite/component/Store";

function page() {
  const search = useSearchParams();
  const id = search.get("data");
  const [coms, setComs] = useState();
  const [bio, setBio] = useState();
  const [issite, setIssite] = useState(false);
  const [product, setProduct] = useState();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [myid, setMyid] = useState();
  const [chesk, setCheck] = useState(false);
  const [ifsite, setIfsite] = useState(false);
  const [link, setLink] = useState();
  const [click, setClick] = useState();
  const [checkchat, setCheckchat] = useState();

  // prosite -
  const checkid = useCallback(async () => {
    const i = sessionStorage.getItem("id");

    setMyid(i);
    if (i === id) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, []);
  const fetchsite = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/getprosite/${id}`);
      if (res.data.success) {
        setIfsite(true);

        setLink(res?.data?.url);
      } else {
        setIfsite(false);
      }
    } catch (error) {
      setIfsite(false);
      console.error("Error fetching data:", error);
    }
  }, [id]);

  // Bio api
  const fetchBio = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/getbio/${id}`);
      setBio(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const fetchComms = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/getcommunities/${id}`);
      if (res?.data?.success) {
        const dp = res?.data?.data?.dps;
        if (dp.length > 0) {
          setLoad(true);
        } else {
          setLoad(false);
        }
        const memdp = res?.data?.data?.memdps;
        const url = res?.data?.data?.urls;
        const post = res?.data?.data?.posts;
        const coms = res?.data?.data?.community;
        const like = res?.data?.data?.liked;
        const merged = dp?.map((d, i) => ({
          dps: d,
          memdps: memdp[i],
          urls: url[i],
          liked: like[i],
          community: coms[i],
          posts: post[i],
        }));
        setComs(merged);
        setLoad(true);
      } else {
        setLoad(false);
      }
    } catch (e) {
      console.log(e);
      setLoad(false);
    }
  }, [id]);
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/fetchproduct/${id}`);

      if (res?.data?.success) {
        const url = res?.data?.data?.urls;
        const pro = res?.data?.data?.product;
        const merge = url?.map((u, i) => ({
          u,
          p: pro[i],
        }));

        setProduct(merge);
        setLoad(true);
      } else {
        setLoad(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    fetchsite();
    fetchBio();
    fetchComms();
    fetchProducts();
  }, [fetchsite, fetchBio, fetchComms, fetchProducts]);

  //check if conv. exists
  const checkconv = useCallback(async () => {
    try {
      const res = await axios.post(`${API}/checkconv`, {
        first: id,
        second: myid,
      });
      setCheckchat(res?.data?.success);
    } catch (e) {
      console.log(e);
    }
  }, [id, myid]);

  useEffect(() => {
    checkid();

    checkconv();
  }, [checkid, checkconv]);

  return (
    <div className="bg-white text-black overflow-auto scrollbar-hide w-screen h-screen">
      {/* Header */}
      <div>
        <div className="px-2 bg-white mx-3 items-center justify-between w-[100%] flex flex-row py-2">
          <div className="flex flex-row w-[10%] bg-[#F9F9F9] rounded-lg justify-evenly items-center ">
            <div className="h-[35px] w-[35px]  rounded-2xl bg-yellow-400"></div>
            <div className="flex flex-col">
              {Array.isArray(data) && data.map((d, i) => console.log(d))}
              <div className="font-sans text-black text-[12px] font-bold">
                Riya Singh
              </div>
              <div className="font-sans text-black text-[12px] ">
                Singh_riya
              </div>
            </div>
          </div>
          <div className="flex flex-row bg-[#F9F9F9] mx-3 rounded-lg h-[35px] justify-center pn:max-md:hidden">
            <div
              onClick={() => {
                setClick(1);
              }}
              className={`${
                click === 1
                  ? "bg-black m-1 rounded-2xl w-[100px] font-sans flex font-medium text-[14px] justify-center items-center h-[25px] text-white"
                  : "bg-[#F9F9F9] m-1 rounded-2xl flex justify-center items-center w-[100px] font-sans h-[25px] font-medium text-[14px] text-black"
              }`}
            >
              About
            </div>
            <div
              onClick={() => {
                setClick(2);
              }}
              className={`${
                click === 2
                  ? "bg-black m-1 rounded-2xl w-[100px] font-sans flex font-medium text-[14px] justify-center items-center h-[25px] text-white"
                  : "bg-[#F9F9F9] m-1 rounded-2xl flex justify-center items-center w-[100px] font-sans h-[25px] font-medium text-[14px] text-black"
              }`}
            >
              Store
            </div>
            <div
              onClick={() => {
                setClick(3);
              }}
              className={`${
                click === 3
                  ? "bg-black m-1 rounded-2xl w-[100px] font-sans flex font-medium text-[14px] justify-center items-center h-[25px] text-white"
                  : "bg-[#F9F9F9] m-1 rounded-2xl flex justify-center items-center w-[100px] font-sans h-[25px] font-medium text-[14px] text-black"
              }`}
            >
              Community
            </div>
          </div>
        </div>
        <div className="flex pn:max-md:flex-col-reverse items-center py-4 w-[100%] h-[60%]">
          <div className="flex  flex-col md:w-[50%] h-[100%] justify-center items-center">
            <div className="flex flex-col w-[60%] h-[60%] justify-center items-center">
              <div className="md:text-[25px] text-center text-black font-bold my-2">
                "Unleash your passion to personalize your space and show the
                world the extraordinary things you're capable of “
              </div>
              <div className="text-[16px] text-center text-black font-medium">
                Prosite : fully customizable layouts for an enhanced
                personalization experience
              </div>
              <div className="bg-[#0075FF] text-white font-sans mt-6 font-medium text-[16px] w-[160px] flex justify-center items-center  py-2 rounded-lg">
                Edit now
              </div>
            </div>
          </div>
          <div className="h-[60%] md:w-[50%] flex justify-center items-center ">
            <Image src={yupp} className="h-[60%] w-[60%] object-contain" />
          </div>
        </div>

        {/* About section */}
        <Bio bio={bio} />
        {/* Store section 2 */}
        <Community coms={coms} />

        <div className=" flex justify-center py-6 items-center px-4">
          <div className=" w-[100%] h-[1px] rounded-full bg-slate-100"></div>
        </div>

        {/* Store section */}
        <Store product={product} id={id} />

        <div className="py-2 items-center justify-between px-2 w-[100%] mt-4 border-t-2 border-[#f9f9f9]  flex flex-row">
          <div className="flex flex-row items-center">
            <Image src={logo} className="h-[35px] w-[35px]" />
            <div className="text-black text-[18px] font-bold font-sans">
              Grovyo
            </div>
          </div>
          <div className="text-black text-[12px] font-sans">
            Copyright © 2023 Grovyo Templates | All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
