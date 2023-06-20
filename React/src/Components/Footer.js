import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="box logo">
            <p>Berita Terbaru hanya Dengan Kami!</p>
            <i className="fa fa-envelope"></i>
            <span> discusst@news.com </span> <br />
            <i className="fa fa-headphones"></i>
            <span> +62xxxxxxxxx</span>
          </div>
          <div className="box">
            <h3>Teknologi</h3>
            <div className="item">
              <p>AI Art yang menjadi trend akhir-akhir ini...</p>
            </div>
            <div className="item">
              <p>CHATGPT, kemajuan atau kehancuran?</p>
            </div>
          </div>
          <div className="box">
            <h3>Olahraga</h3>
            <div className="item">
              <p>Argentina vs Indonesia tanding pada FifaMatchday.</p>
            </div>
            <div className="item">
              <p>Setelah 32 Tahun, Indonesia Akhirnya Membawa Pulang Emas</p>
            </div>
          </div>
          <div className="box">
            <h3>Kategori</h3>
            {/*<i className='fa fa-chevron-right'></i>*/}
            <ul>
              <li>
                <span>Berita</span> <label>(3)</label>
              </li>
              <li>
                <span>Olahraga</span> <label>(2)</label>
              </li>
              <li>
                <span>Politik</span> <label>(5)</label>
              </li>
              <li>
                <span>Teknologi</span> <label>(3)</label>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal  ">
        <div className="container flexSB">
          <p>© all rights reserved</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
