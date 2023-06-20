import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import Update from "./Update";
import Delete from "./Delete";

export default function ListAll() {
  const [news, setNews] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`http://127.0.0.1:8000/api/news`).then((response) => {
        setNews(response.data.data);
      });
    };

    fetchData().catch(console.error);
  }, [news]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5vh",
        }}
      >
        <h2 style={{ marginLeft: "5vw", alignSelf: "center" }}>List Berita</h2>
        <div>
          <Card
            bg={"light"}
            key={"light"}
            style={{ width: "fit-content", marginRight: "5vw" }}
          >
            <Card.Header>
              <h5>Jumlah Berita</h5>
              <Card.Text>{news.length}</Card.Text>
            </Card.Header>
          </Card>
        </div>
      </div>
      <div className="shadow" style={{ marginLeft: "3vw", marginRight: "3vw" }}>
        <Table striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Penulis</th>
              <th>Judul</th>
              <th>Isi</th>
              <th>Gambar</th>
              <th>Dibuat Pada</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {news.map((berita, index) => {
              const date = berita.created_at;
              return (
                <tr key={index}>
                  <td>{berita.id}</td>
                  <td>{berita.penulis}</td>
                  <td>{berita.title}</td>
                  <td>
                    <span className="newscontent">
                      {berita.content && berita.content.length > 50
                        ? `${berita.content.substring(0, 50)}...`
                        : berita.content}
                    </span>
                  </td>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000/storage/posts/${berita.image}`}
                      width={"100px"}
                    />
                  </td>
                  <td>{date?.substring(0, 10)}</td>
                  <td style={{ display: "flex" }}>
                    <Update id={berita.id} />
                    <Delete id={berita.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
