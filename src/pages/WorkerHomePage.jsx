import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";
import man from "../images/worker.png";
import axios from "axios";
import { setCurrentOrder } from "../module/slices/order";
import { setStoreId } from "../module/slices/store";
import NavBar from "../components/NavBar";
import Empty from "../components/Empty";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Header from "../components/Header";
import { useCallback } from "react";

const WorkerHomePage = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const loc = state.sign.location.split(" ");
  const locName = `${loc[0]} ${loc[1]} ${loc[2]}`;
  const [loca, setLoc] = useState("");
  const [range, setRange] = useState("");
  const [name, setName] = useState("");
  const [notFound, setIsNotFound] = useState(false);

  const [stores, setStores] = useState([]);
  const [cursor, setCursor] = useState(0);
  const dispatch = useDispatch();

  const onNextPage = (e) => {
    dispatch(setStoreId(e));
    sessionStorage.setItem("store_id", e);
    navigate("/worker/interview");
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/addr/range`, {
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => {
        setLoc(res.data[0].location);
        setRange(res.data[0].range);
        setName(res.data[0].name);
      });
  }, []);

  const getStoreList = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/store/list`, {
        worker_id: sessionStorage.getItem("worker_id"),
        cursor: "null",
      })
      .then((res) => {
        if (res.data === "error - store/list") {
          setStores([]);
        } else if (res.data === "notFound") {
          setIsNotFound(true);
        } else {
          setCursor(res.data[res.data.length - 1].store_id);
          setStores(res.data);
        }
      });
  };

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    // console.log(
    //   "scrollHeight : ",
    //   scrollHeight,
    //   "scrollTop : ",
    //   scrollTop,
    //   "clientHeight : ",
    //   clientHeight
    // );

    if (scrollTop + clientHeight + 120 >= scrollHeight) {
      axios
        .post(`${process.env.REACT_APP_ROUTE_PATH}/store/list`, {
          worker_id: sessionStorage.getItem("worker_id"),
          cursor: cursor,
        })
        .then((res) => {
          if (res.data === "notFound") {
            return;
          }
          setCursor(res.data[res.data.length - 1].store_id);
          setStores((list) => [...list, ...res.data]);
        });
    }
  }, [stores]);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  useEffect(() => {
    getStoreList();
  }, []);

  return (
    <div className="font-sans bg-cyan-500 h-screen">
      <Header title="?????? ??????" worker={true} isFirst={true} />
      <NavBar mode="WORKER" />
      {/* ?????? */}
      <div className="bg-slate-100">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold flex ">
            {loca.split(" ").slice(0, 3).join(" ")}
            {/* <HiOutlineLocationMarker className="text-2xl ml-2 text-red-400 font-bold animate-bounce " /> */}
          </h1>
          <p className="rounded-lg font-bold text-xl flex items-center">
            <p className="text-xs text-gray-500 pr-1 pt-2 ">??? ??????</p>
            <span className="font-bold text-red-400 text-2xl "> {range}</span>m
          </p>
        </div>
        {/* ?????? */}
        <div className="flex m-4 mb-0 justify-between">
          <div className="flex-column">
            <p className="text-2xl mb-2 font-bold">?????????</p>
            <p className="font-bold ">
              <span className="text-cyan-500  font-extrabold font-jua text-3xl">
                ?????? ??????
              </span>
            </p>
            <p className="text-2xl mb-0.5 font-bold">??? ??????!</p>
          </div>
          <img src={man} alt="walking man" width="120" className="" />
        </div>
      </div>
      {/* ?????? */}
      <div className="p-8 py-0 bg-cyan-500 pb-24">
        <h1 className="text-lg font-bold mb-4 text-right pt-4">
          <span className="text-2xl text-white">{name} </span>?????? ????????????
          ?????????.
        </h1>
        <div>
          {notFound ? (
            <div className=" text-center font-bold pt-28">
              <p className="animate-pulse text-lg">
                ?????? ????????? ????????? ????????????
              </p>
            </div>
          ) : stores && stores.length !== 0 ? (
            stores.map((store, index) => {
              return (
                <StoreCard
                  key={index}
                  store={store.name}
                  distance={store.distance}
                  jobs={[]}
                  storeImage={`${process.env.REACT_APP_S3_PATH}${store.background_image}`}
                  minPay={store.minimum_wage}
                  ment={store.description}
                  onClickEvent={() => {
                    onNextPage(store.store_id);
                  }}
                />
              );
            })
          ) : (
            <Empty text={"?????? ???????????? ???????????? ????????????."} margin={10} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerHomePage;
