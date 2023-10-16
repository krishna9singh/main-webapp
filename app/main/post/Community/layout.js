"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { API } from "@/Essentials";
import Image from "next/image";
import tick from "../../../assets/Images/bluetick.png";
import moment from "moment/moment";
import Empty from "../../../assets/Images/community.png";
import Link from "next/link";
import clap from "../../../assets/Images/clap.png";
import ClickClap from "../../../assets/Images/Clickclap.png";
import { VscSend } from "react-icons/vsc";

export default function CommunityLayout({ children }) {
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  const [id, setId] = useState("");
  // join
  const [sub, setSub] = useState();
  const [switchpost, setSwitchpost] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentcomId, setCurrentcomId] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  const fetchCom = useCallback(async () => {
    setLoad(false);
    const id = sessionStorage.getItem("id");
    setId(id);
    try {
      const res = await axios.get(`${API}/getfollowingfeed/${id}`);

      if (res?.data?.success) {
        const dp = res?.data?.data?.dps;
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
        setData(merged);
        setLoad(true);
        setCurrentcomId(merged[0]?.posts[0]?.community);
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  }, [id]);

  // const handleLike = async (e) => {
  //   e.preventDefault();
  //   setLiked(!liked);
  //   try {
  //     const res = await axios.post(`${API}/likepost/${id}/${item?.posts?._id}`);
  //     if (res.data.success) {
  //       if (liked) {
  //         setLikeCount(likeCount - 1);
  //       } else {
  //         setLikeCount(likeCount + 1);
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };
  // const handleUnjoin = async (e) => {
  //   e.preventDefault();
  //   setSub(true);
  //   try {
  //     await axios.post(`${API}/unjoin/${id}/${currentcomId}`);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };
  //a simple function toggling subscriptions
  const toggleSubscription = (index) => {
    const newSubsState = [...sub];
    newSubsState[index] =
      newSubsState[index] === "unsubscribed" ? "subscribed" : "unsubscribed";
    setSub(newSubsState);
  };

  //another simple function or toogling likes
  const toggleLikes = (index) => {
    const newLikedState = [...liked];
    const newLikeCounts = [...likeCount];

    newLikedState[index] = newLikedState[index] === "false" ? "true" : "false";

    if (newLikedState[index] === "true") {
      newLikeCounts[index]++;
    } else {
      newLikeCounts[index]--;
    }

    setLiked(newLikedState);
    setLikeCount(newLikeCounts);
  };
  useEffect(() => {
    fetchCom();
  }, []);
  if (load) {
    return (
      <div className=" w-[100%] h-screen dark:bg-[#000] bg-white flex pn:max-md:justify-center">
        <div className="h-screen overflow-auto scrollbar-hide pt-24 select-none md:min-w-[390px] md:w-[360px] flex flex-col items-center pn:max-sm:pb-36 md:pt-14 md:border-r-2 border-[#f7f7f7] dark:border-[#171717] self-end ">
          {data?.map((d, t) => (
            <React.Fragment key={t}>
              <Link
                href={{
                  pathname: "../../../../main/post/Community/inner",
                  query: {
                    comId: currentcomId,
                    id: id,
                  },
                }}
                className="w-[100%] hover:bg-[#fafafa] dark:hover:bg-[#171717] rounded-2xl flex flex-col items-center pn:max-md:hidden"
                onClick={() => {
                  setSwitchpost(true);
                }}
              >
                {/* DP and join */}
                <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
                  <div className="flex flex-row w-[100%] h-[100%] items-center justify-between">
                    <div className="flex w-[300px]">
                      <div className="flex object-scale-down items-center h-[45px] w-[45px] rounded-2xl shadow-sm ring-1 ring-white ">
                        <img
                          alt="dp"
                          src={d?.dps}
                          className=" h-[45px] w-[45px] rounded-2xl shadow-sm ring-1 ring-white "
                        />
                      </div>
                      {/* Community name */}
                      <div className="flex flex-col w-[70%] justify-center px-2 items-start">
                        <div className="flex flex-row items-center">
                          <div className="text-black text-[14px] font-bold ">
                            {d?.community?.title}
                          </div>
                          {d?.posts[0]?.isverified ? (
                            <img
                              alt="tick"
                              src={tick}
                              className="h-[15px] w-[15px] mx-1"
                            />
                          ) : null}
                        </div>

                        <div className="flex flex-row items-center ">
                          <div className="text-[11px] text-[#3e3e3e] font-medium ">
                            {d?.posts[0]?.sender?.fullname}
                          </div>
                          <div className="h-[3px] w-[3px] bg-[#3e3e3e] flex rounded-full mx-1"></div>
                          {/* //Time */}
                          <div className="text-[11px] text-[#3e3e3e] font-medium ">
                            {moment(d?.posts[0]?.createdAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Animation of join nd bell */}
                    {sub === "unsubscribed" ? (
                      <div
                        onClick={(e) => {
                          const callme = async () => {
                            e.preventDefault();
                            toggleSubscription(t);
                            try {
                              await axios.post(
                                `${API}/joincom/${id}/${d?.posts?.community?._id}`
                              );
                            } catch (e) {
                              console.log(e.message);
                            }
                          };
                          callme();
                        }}
                        className="cursor-pointer flex h-[35px] w-[25%]  justify-center items-center "
                      >
                        <div className="bg-[#f5f5f5] flex w-[100%] text-[#000] text-[12px] justify-center items-center font-medium rounded-2xl h-[100%]">
                          Join
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={(e) => {
                          const callme = async () => {
                            e.preventDefault();
                            toggleSubscription(t);
                            try {
                              await axios.post(
                                `${API}/unjoin/${id}/${d?.posts?.community?._id}`
                              );
                            } catch (e) {
                              console.log(e.message);
                            }
                          };
                          callme();
                        }}
                        className="cursor-pointer flex h-[35px] w-[25%]  justify-center items-center "
                      >
                        <div className="bg-black flex w-[100%] text-white text-[12px] justify-center items-center font-medium rounded-2xl h-[100%]">
                          Leave
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* POst */}
                <div className="bg-[#f9f9f9] p-1 rounded-2xl">
                  {load ? (
                    <div className="h-[220px] bg-black md:h-[250px] md:w-[360px] rounded-2xl w-[380px] flex justify-center items-center">
                      {d?.posts[0]?.contenttype[0] === "video/mp4" ? (
                        <video
                          src={d?.urls}
                          className="h-[220px] object-cover z-0 md:h-[250px] md:w-[360px] rounded-2xl w-[380px]"
                          alt="img"
                          controls
                        />
                      ) : (
                        <img
                          src={d?.urls}
                          className="h-[220px] object-cover md:h-[250px] md:w-[380px] rounded-2xl w-[380px]"
                          alt="img"
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className={`${
                        load
                          ? "h-[220px] bg-slate-700 shadow-md md:h-[250px] md:w-[380px] rounded-2xl w-[380px] flex justify-center items-center"
                          : "hidden"
                      }`}
                    ></div>
                  )}
                  <div className="w-[350px] h-[30px] p-1  text-ellipsis overflow-hidden ">
                    <div className="text-[14px] py-1 text-black">
                      {d?.posts[0]?.title}
                    </div>
                  </div>
                </div>
                <div className="h-[1px] my-2 w-[80%] rounded-full flex self-center bg-[#f1f1f1]"></div>
              </Link>
              <Link
                href={{
                  pathname: "../../../phone/NewInner",
                  query: {
                    comId: currentcomId,
                    id: id,
                  },
                }}
                className="w-[100%] md:hidden dark:hover:bg-[#171717] rounded-2xl flex flex-col items-center"
              >
                {/* DP and join */}
                <div className="h-[55px] px-4 w-[100%] flex flex-row items-center ">
                  <div className="flex flex-row w-[100%] h-[100%] items-center justify-between">
                    <div className="flex w-[300px]">
                      <div className="flex object-scale-down items-center h-[45px] w-[45px] rounded-2xl shadow-sm ring-1 ring-white ">
                        <img
                          alt="dp"
                          src={d?.dps}
                          className=" h-[45px] w-[45px] rounded-2xl shadow-sm ring-1 ring-white "
                        />
                      </div>
                      {/* Community name */}
                      <div className="flex flex-col w-[70%] justify-center px-2 items-start">
                        <div className="flex flex-row items-center">
                          <div className="text-black text-[14px] font-bold">
                            {d?.community?.title}
                          </div>
                          {d?.isverified ? (
                            <img
                              alt="tick"
                              src={tick}
                              className="h-[15px] w-[15px] mx-1"
                            />
                          ) : null}
                        </div>

                        <div className="flex flex-row items-center ">
                          <div className="text-[11px] text-[#3e3e3e] font-medium ">
                            {d?.posts[0]?.sender?.fullname}
                          </div>
                          <div className="h-[3px] w-[3px] bg-[#3e3e3e] flex rounded-full mx-1"></div>
                          {/* //Time */}
                          <div className="text-[11px] text-[#3e3e3e] font-medium ">
                            {moment(d?.posts[0]?.createdAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Animation of join nd bell */}
                    {sub === "unsubscribed" ? (
                      <div
                        onClick={(e) => {
                          const callme = async () => {
                            e.preventDefault();
                            toggleSubscription(t);
                            try {
                              await axios.post(
                                `${API}/joincom/${id}/${d?.posts?.community?._id}`
                              );
                            } catch (e) {
                              console.log(e.message);
                            }
                          };
                          callme();
                        }}
                        className="cursor-pointer flex h-[35px] w-[25%]  justify-center items-center "
                      >
                        <div className="bg-[#f5f5f5] flex w-[100%] text-[#000] text-[12px] justify-center items-center font-medium rounded-2xl h-[100%]">
                          Join
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={(e) => {
                          const callme = async () => {
                            e.preventDefault();
                            toggleSubscription(t);
                            try {
                              await axios.post(
                                `${API}/unjoin/${id}/${d?.posts?.community?._id}`
                              );
                            } catch (e) {
                              console.log(e.message);
                            }
                          };
                          callme();
                        }}
                        className="cursor-pointer flex h-[35px] w-[25%]  justify-center items-center "
                      >
                        <div className="bg-black flex w-[100%] text-white text-[12px] justify-center items-center font-medium rounded-2xl h-[100%]">
                          Leave
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* POst */}
                <div className="bg-[#f9f9f9] p-1 rounded-2xl">
                  {load ? (
                    <div className="h-[220px] bg-black md:h-[250px] md:w-[350px] rounded-2xl w-[100%] flex justify-center items-center">
                      {d?.posts[0]?.contenttype[0] === "video/mp4" ? (
                        <video
                          src={d?.urls}
                          className="h-[220px] object-cover z-0 md:h-[250px] md:w-[100%] rounded-2xl w-[100%]"
                          alt="img"
                          controls
                        />
                      ) : (
                        <img
                          src={d?.urls}
                          className="h-[220px] object-cover md:h-[250px] md:w-[100%] rounded-2xl w-[100%]"
                          alt="img"
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className={`${
                        load
                          ? "h-[220px] bg-slate-700 shadow-md md:h-[250px] md:w-[380px] rounded-2xl w-[380px] flex justify-center items-center"
                          : "hidden"
                      }`}
                    ></div>
                  )}
                  <div className="w-[350px] h-[30px] p-1  text-ellipsis overflow-hidden ">
                    <div className="text-[14px] py-1 text-[#676767]">
                      {d?.posts[0]?.title}
                    </div>
                  </div>
                </div>
                <div className="h-[50px] justify-center p-2 w-[100%] flex flex-col">
                  <div className="flex">
                    <div className="flex flex-row  justify-start z-0 w-[100%] items-center">
                      {d?.memdps?.length >= 4 ? (
                        <>
                          <img
                            src={d?.memdps[0]}
                            className="h-[25px] w-[25px] rounded-lg z-30 bg-[#f1f1f1] shadow-md"
                            alt="member"
                          />
                          <img
                            src={d?.memdps[1]}
                            alt="member"
                            className="h-[25px] w-[25px] rounded-lg z-20 -ml-[10px] bg-[#f1f1f1] shadow-md"
                          />
                          <img
                            src={d?.memdps[2]}
                            alt="member"
                            className="h-[25px] w-[25px] rounded-lg z-10 -ml-[10px] bg-[#f1f1f1] shadow-md"
                          />
                          <img
                            src={d?.memdps[3]}
                            alt="member"
                            className="h-[25px] w-[25px] rounded-lg z-0 -ml-[10px] bg-[#f1f1f1] shadow-md"
                          />
                        </>
                      ) : (
                        <img
                          src={d?.memdps}
                          className="h-[25px] w-[25px] rounded-lg z-30 bg-[#f1f1f1] shadow-md"
                          alt="member"
                        />
                      )}

                      <div className="text-[12px] font-medium px-2 text-[#3e3e3e]">
                        {d?.memdps?.length} members
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div
                        onClick={(e) => {
                          const handleLike = async () => {
                            e.preventDefault();
                            toggleLikes(t);
                            const res = await axios.post(
                              `${API}/likepost/${id}/${d?.posts?._id}`
                            );
                            if (res?.data?.success) {
                              console.log("success", liked[t]);
                            }
                          };

                          handleLike();
                        }}
                        className="h-[35px] hover:bg-[#f1f1f1] bg-[#F5F5F5] rounded-2xl justify-between flex items-center px-[10px] text-[#3e3e3e] w-[60px]"
                      >
                        {liked[t] === true ? (
                          <Image
                            alt="ClickClap"
                            src={ClickClap}
                            className="w-[26px] select-none h-[25px]"
                          />
                        ) : (
                          <Image
                            alt="clap"
                            src={clap}
                            className="w-[26px] select-none h-[25px]"
                            priority={true}
                          />
                        )}
                        {likeCount[t]}
                      </div>
                      <div className=" bg-[#F5F5F5] rounded-xl flex items-center px-2 text-[#3e3e3e] ">
                        <VscSend />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] my-2 w-[80%] rounded-full flex self-center bg-[#f1f1f1]"></div>
              </Link>
            </React.Fragment>
          ))}
        </div>
        {/* inside potion */}
        {switchpost ? (
          <div className="pn:max-md:hidden w-[100%]"> {children}</div>
        ) : (
          // Empty
          <div className="w-[100%] pn:max-md:hidden flex p-2 bg-white dark:bg-[#171717] text-[#3e3e3e] flex-col justify-center items-center">
            <div className="flex bg-[#f9f9f9] p-4 py-8 rounded-2xl justify-center flex-col items-center">
              <Image src={Empty} alt="empty" />
              <div className="text-[20px] font-bold">
                Open Community To see Posts
              </div>
              <div className="font-medium">No messages in your inbox</div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-[100%] h-screen bg-white dark:bg-[#171717] flex pn:max-md:justify-center">
        <div className=" pn:max-md:h-[96vh] h-screen overflow-auto scrollbar-hide space-y-2 bg-white py-12 select-none md:min-w-[390px] md:w-[360px] flex flex-col items-center pb-20 md:pt-10 md:border-r-2 border-[#f7f7f7] dark:border-[#171717]   self-end ">
          {/* DP and join */}
          <div className="bg-slate-50 p-4 rounded-2xl">
            <div className="w-[100%] hover:bg-[#f9f9f9] rounded-2xl flex flex-col items-center pn:max-md:hidden">
              <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
                <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
                  <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse"></div>
                </div>
                {/* Community name */}
                <div className="flex flex-col w-[60%] justify-center px-2 items-start">
                  <div className="flex flex-col space-y-1 items-center">
                    <div className="text-black text-[13px] w-[100px] h-[20px] bg-slate-200 rounded-lg animate-pulse"></div>
                    <div className="text-black text-[13px] w-[100px] h-[10px] bg-slate-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Animation of join nd bell */}

                <div className="cursor-pointer bg-slate-200 rounded-2xl animate-pulse flex h-[35px] w-[25%]  justify-center items-center "></div>
              </div>
            </div>

            {/* POst */}

            <div className="h-[200px] rounded-2xl bg-slate-200 animate-pulse w-[360px] flex justify-center items-center "></div>
            <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
              <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg animate-pulse my-1"></div>
              <div className="flex flex-row justify-start w-[100%]">
                <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 animate-pulse"></div>
                <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 animate-pulse"></div>
                <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 animate-pulse"></div>
                <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl">
            <div className="w-[100%] hover:bg-[#f9f9f9] rounded-2xl flex flex-col items-center pn:max-md:hidden">
              <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
                <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
                  <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse"></div>
                </div>
                {/* Community name */}
                <div className="flex flex-col w-[60%] justify-center px-2 items-start">
                  <div className="flex flex-col space-y-1 items-center">
                    <div className="text-black text-[13px] w-[100px] h-[20px] bg-slate-200 rounded-lg animate-pulse"></div>
                    <div className="text-black text-[13px] w-[100px] h-[10px] bg-slate-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Animation of join nd bell */}

                <div className="cursor-pointer bg-slate-200 rounded-2xl animate-pulse flex h-[35px] w-[25%]  justify-center items-center "></div>
              </div>
            </div>

            {/* POst */}

            <div className="h-[200px] rounded-2xl bg-slate-200 animate-pulse w-[360px] flex justify-center items-center "></div>
            <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
              <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg animate-pulse my-1"></div>
              <div className="flex flex-row justify-start w-[100%]">
                <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 animate-pulse"></div>
                <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 animate-pulse"></div>
                <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 animate-pulse"></div>
                <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl">
            <div className="w-[100%] hover:bg-[#f9f9f9] rounded-2xl flex flex-col items-center pn:max-md:hidden">
              <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
                <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
                  <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse"></div>
                </div>
                {/* Community name */}
                <div className="flex flex-col w-[60%] justify-center px-2 items-start">
                  <div className="flex flex-col space-y-1 items-center">
                    <div className="text-black text-[13px] w-[100px] h-[20px] bg-slate-200 rounded-lg animate-pulse"></div>
                    <div className="text-black text-[13px] w-[100px] h-[10px] bg-slate-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Animation of join nd bell */}

                <div className="cursor-pointer bg-slate-200 rounded-2xl animate-pulse flex h-[35px] w-[25%]  justify-center items-center "></div>
              </div>
            </div>

            {/* POst */}

            <div className="h-[200px] rounded-2xl bg-slate-200 animate-pulse w-[360px] flex justify-center items-center "></div>
            <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
              <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg animate-pulse my-1"></div>
              <div className="flex flex-row justify-start w-[100%]">
                <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 animate-pulse"></div>
                <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 animate-pulse"></div>
                <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 animate-pulse"></div>
                <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 animate-pulse"></div>
              </div>
            </div>
          </div>
          {/* POst */}
        </div>
        <div className="w-[100%] pn:max-md:hidden flex p-2 bg-white dark:bg-[#171717] text-[#3e3e3e] flex-col justify-center items-center">
          <div className="flex bg-[#f9f9f9] p-4 py-8 rounded-2xl justify-center flex-col items-center">
            <Image src={Empty} alt="empty" />
            <div className="text-[20px] font-bold">
              Open Community To see Posts
            </div>
            <div className="font-medium">No messages in your inbox</div>
          </div>
        </div>
      </div>
    );
  }
}
