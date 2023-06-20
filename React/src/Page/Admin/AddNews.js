import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function AddNews() {
  const [show, setShow] = useState(false);
  const [news, setNews] = useState({
    title: "",
    content: "",
    penulis: "",
    kategori: "",
    image: null,
  });

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
    console.log(news);
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
    axios.post("http://127.0.0.1:8000/api/news", data).then((res) => {
      handleClose();
      console.log(res);
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        style={{
          backgroundColor: "transparent",
          border: "none",
          marginBottom: 20,
          position: "fixed",
          bottom: 0,
          right: 0,
          marginRight: 20,
        }}
        onClick={handleShow}
      >
        <svg
          width="61"
          height="61"
          viewBox="0 0 61 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="30.5" cy="30.5" r="30.5" fill="#0D6EFD" />
          <path
            d="M28.7082 40.7628V19.669H32.2878V40.7628H28.7082ZM19.9511 32.0057V28.4261H41.0449V32.0057H19.9511Z"
            fill="white"
          />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Berita</Modal.Title>
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
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Penulis</Form.Label>
              <Form.Control
                type="text"
                name="penulis"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                name="kategori"
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <Form.Text muted>
                Harap selalu menuliskan berita yang telah jelas kebenarannya.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
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
