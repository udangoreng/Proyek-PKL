import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function Update(props) {
  const [show, setShow] = useState(false);

  const [news, setNews] = useState({
    id: props.id,
    title: "",
    content: "",
    kategori: "",
    penulis: "",
    image: null,
  });

  const getData = () => {
    console.log(props.id);
    axios
      .get(`http://127.0.0.1:8000/api/news/${props?.id}`)
      .then((response) => {
        setNews({
          ...news,
          id: props.id,
          title: response.data.data.title,
          content: response.data.data.content,
          penulis: response.data.data.penulis,
          kategori: response.data.data.kategori,
          image: response.data.data.image,
        });
        console.log(response);
      });
  };

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setNews({ ...news, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", news.title);
    data.append("content", news.content);
    data.append("penulis", news.penulis);
    data.append("kategori", news.kategori);
    data.append("image", news.image);
    data.append("_method", "PUT");
    axios
      .post(`http://127.0.0.1:8000/api/news/${props.id}`, data)
      .then((res) => {
        handleClose();
        console.log(res);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getData();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "4px" }}
        >
          <path
            d="M1 26H13.5H26"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.8081 4.92838L17.7366 1L24.6112 7.87465L20.6829 11.803M13.8081 4.92838L6.02123 12.7153C5.76077 12.9758 5.61444 13.3291 5.61444 13.6974V19.9967H11.9138C12.2822 19.9967 12.6354 19.8505 12.8959 19.5899L20.6829 11.803M13.8081 4.92838L20.6829 11.803"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Berita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="title"
                onChange={handleChange}
                defaultValue={news.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Penulis</Form.Label>
              <Form.Control
                type="text"
                name="penulis"
                onChange={handleChange}
                value={news.penulis}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                name="kategori"
                onChange={handleChange}
                defaultValue={news.kategori}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Berita</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="content"
                defaultValue={news.content}
                onChange={handleChange}
              />
              <Form.Text muted>
                Harap selalu menuliskan berita yang telah jelas kebenarannya.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <img
                src={`http://127.0.0.1:8000/storage/posts/${news.image}`}
                width={"300px"}
              />
              <br />
              <Form.Label>Gambar</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImage} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
