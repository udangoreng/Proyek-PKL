import React, { useEffect } from "react";
import ListAll from "./ListAll";
import Navbar from "../../Components/Admin/Navbar";
import AddNews from "./AddNews";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <ListAll />
      <AddNews />
    </>
  );
}
