import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/singlepage.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const SinglePage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/news/${id}`).then((response) => {
      setNews({
        ...news,
        id: id,
        title: response.data.data.title,
        content: response.data.data.content,
        penulis: response.data.data.penulis,
        image: response.data.data.image,
        created_at: response.data.data.created_at,
      });
    });
  }, [news]);

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <section className="mainContent details">
            <h1 className="title">{news?.title}</h1>
            <div className="author">
              <span>by {news?.penulis}</span>
              <label style={{ marginLeft: "2vw" }}>
                {news?.created_at.substring(0, 10)}
              </label>
            </div>
            <div className="social">
              <div className="socBox">
                <i className="fab fa-facebook-f"></i>
                <span>SHARE</span>
              </div>
              <div className="socBox">
                <i className="fab fa-twitter"></i>
                <span>TWITTER</span>
              </div>
              <div className="socBox">
                <i className="fab fa-pinterest"></i>
                <span>FACEBOOK</span>
              </div>
              <div className="socBox">
                <i className="fa fa-envelope"></i>
                <span>WHATSAPP</span>
              </div>
            </div>
            <img
              src={`http://127.0.0.1:8000/storage/posts/${news?.image}`}
              alt=""
            />

            <div className="descbot" style={{ whiteSpace: "pre-wrap" }}>
              {news?.content}
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default SinglePage;
