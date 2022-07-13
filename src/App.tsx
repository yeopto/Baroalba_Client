import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitPage from "./pages/InitPage";
import LoginPage from "./pages/LoginPage";
import OwnerStoreNamePage from "./pages/OwnerStoreNamePage";
import OwnerStoreLocationPage from "./pages/OwnerStoreLocationPage";
import OwnerJobTypePage from "./pages/OwnerJobTypePage";
import OwnerMyPage from "./pages/OwnerMyPage";
import WorkerLocationPage from "./pages/WorkerLocationPage";
import WorkerDistancePage from "./pages/WorkerDistancePage";
import WorkerHomePage from "./pages/WorkerHomePage";
import WorkerInterviewPage from "./pages/WorkerInterviewPage";
import WorkerNearWorkPage from "./pages/WorkerNearWorkPage.jsx";
import WorkerReserveWorkPage from "./pages/WorkerReserveWorkPage";
import WorkMyPage from "./pages/WorkMyPage";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "./module/rootReducer";
import { addUser, User } from "./module/slices/users";

function App() {
  // const onTest = async () => {
  //   await axios
  //     .get("http://localhost:4000/")
  //     .then((res) => console.log(res.data))
  //     .catch();
  // };

  // useEffect(() => {
  //   onTest();
  // }, []);

  //const users = useSelector<ReducerType, User[]>((state) => state.users);
  //const dispatch = useDispatch();

  //useEffect(() => {
   // dispatch(addUser({ id: 3, name: "강세훈" }));
 //}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<InitPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/owner/storename" element={<OwnerStoreNamePage />} />
        <Route path="/owner/storelocation" element={<OwnerStoreLocationPage />} />
        <Route path="/owner/jobtype" element={<OwnerJobTypePage />} />
        <Route path="/owner/mypage" element={<OwnerMyPage />} />
        <Route path="/worker/location" element={<WorkerLocationPage title="내 위치를" src='/worker/distance'/>} />
        <Route path="/worker/distance" element={<WorkerDistancePage />} />
        <Route path="/worker/home" element={<WorkerHomePage />} />
        {/* 면접 신청 페이지 */}
        <Route path="/worker/interview" element={<WorkerInterviewPage />} />
        {/* 주변 일감 */}
        <Route path="/worker/nearWork" element={<WorkerNearWorkPage />} />
        {/* 알바 예약*/}
        <Route path="/worker/reserveWork" element={<WorkerReserveWorkPage />} />
        {/* 마이 페이지 */}
        <Route path="/worker/mypage" element={<WorkMyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
