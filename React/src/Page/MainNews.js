import React, { useEffect, useState } from "react";
import "./css/hero.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MainNews() {
  const [news, setNews] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`http://127.0.0.1:8000/api/news`).then((response) => {
        setNews(response.data.data);
        console.log(news);
      });
    };

    fetchData().catch(console.error);
  }, [news]);

  return (
    <>
      <section className="hero">
        <div className="container">
          {news.map((berita, index) => {
            const date = berita.created_at;
            return (
              <>
                <div className="box">
                  <div className="img">
                    <img
                      src={`http://127.0.0.1:8000/storage/posts/${berita.image}`}
                      alt=""
                    />
                  </div>
                  <div className="text">
                    <span className="category">{berita.kategori}</span>
                    {/* <h1 className='titleBg'>{title}</h1> */}
                    <div
                      classname="overlay"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: "2vw",
                      }}
                    >
                      <Link to={`/Detail/${berita.id}`}>
                        <h1 className="titleBg">{berita.title}</h1>
                      </Link>
                      <div className="author flex">
                        <span>{berita.penulis}</span>
                        <span>{date?.substring(0, 10)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}
