import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Delete(props) {
    const [show, setShow] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://127.0.0.1:8000/api/news/${props.id}`, {
            id: props.id,
        }).then((res) => {
            console.log(res);
            handleClose();
        })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="danger" style={{ marginLeft: '3rem' }} onClick={handleShow}>
                <svg width="15" height="15" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
                    <path d="M23.2222 12.1111V25.1666C23.2222 25.6269 22.8492 26 22.3889 26H4.6111C4.15087 26 3.77777 25.6269 3.77777 25.1666V12.1111" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.7222 20.4444V12.1111" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.2778 20.4444V12.1111" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M26 6.55556H19.0556M19.0556 6.55556V1.83333C19.0556 1.3731 18.6825 1 18.2222 1H8.77778C8.31754 1 7.94444 1.3731 7.94444 1.83333V6.55556M19.0556 6.55556H7.94444M1 6.55556H7.94444" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Berita</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <svg width="90" height="90" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.5 48C37.425 48 48 37.425 48 24.5C48 11.575 37.425 1 24.5 1C11.575 1 1 11.575 1 24.5C1 37.425 11.575 48 24.5 48Z" stroke="#F8BB86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M24.5 15.1V26.85" stroke="#F8BB86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M24.4868 33.9H24.508" stroke="#F8BB86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Yakin Hapus Berita?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Batal
                    </Button>

                    <Button variant="danger" onClick={handleDelete}>
                        Ya
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
