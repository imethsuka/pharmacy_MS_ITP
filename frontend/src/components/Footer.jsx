import React from "react";
import "../styles/Footer.css";
import "../index.css";
// import "@fortawesome/fontawesome-free/css/all.css";


function Footer() {
  return (
    <footer className="Footer">
      <center>
        <table style={{ width: "100%", height: "20px" }}>
          <tbody>
            <tr className="F-list" style={{ height: "20px" }}>
              <td>
                <p style={{ fontSize: "15px" }}>LOCATION</p>
              </td>
              <td>
                <p style={{ fontSize: "15px" }}>CONTACT US</p>
              </td>
              <td>
                <p style={{ fontSize: "15px" }}>TERMS AND CONDITION</p>
              </td>
              <td>
                <p style={{ fontSize: "15px" }}>STAY CONNECTED</p>
              </td>
            </tr>

            <tr className="F-list" style={{ height: "20px" }}>
              <td className="data1">
                <a href="https://www.google.com/maps/dir//Malabe+sliit+location+google+map/@6.9119446,79.957354,13.75z/data=!4m9!4m8!1m1!4e2!1m5!1m1!1s0x3ae256db1a6771c5:0x2c63e344ab9a7536!2m2!1d79.9729445!2d6.9146775?entry=ttu">
                  <p>
                    <i className="fa-solid fa-location-dot" style={{ color: "white" }}></i>
                  </p>
                </a>
              </td>
              <td className="data">
                <p style={{ fontSize: "12px" }}>0117544910</p>
              </td>
              <td className="data">
                <a href="#" style={{ color: "white" }}>
                  <p style={{ color: "white", fontSize: "12px" }}>Term of use</p>
                </a>
              </td>
              <td>
                <a href="https://www.facebook.com/sliit.lk">
                  <p>
                    <i className="fa-brands fa-facebook" style={{ color: "white" }}></i>
                  </p>
                </a>
              </td>
            </tr>

            <tr className="F-list" style={{ height: "20px" }}>
              <td></td>
              <td className="data">
                <a href="mailto:studentitservices@sliit.lk" style={{ color: "white" }}>
                  <p style={{ color: "white", fontSize: "12px" }}>wellnesswise@gmail.com</p>
                </a>
              </td>
              <td className="data">
                <a href="#" style={{ color: "white" }}>
                  <p style={{ color: "white", fontSize: "12px" }}>Privacy Policy</p>
                </a>
              </td>
              <td>
                <a href="https://www.instagram.com/sliit.life/">
                  <p>
                    <i className="fa-brands fa-instagram" style={{ color: "white" }}></i>
                  </p>
                </a>
              </td>
            </tr>

            <tr className="F-list" style={{ height: "20px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href="https://www.linkedin.com/school/sliit/">
                  <p>
                    <i className="fa-brands fa-linkedin" style={{ color: "white" }}></i>
                  </p>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <a href="#">
          <p>
            <input type="button" value="PROVIDE FEEDBACK" className="s-btn" />
          </p>
        </a>

        <hr />
        <h4>@2025 ALL RIGHTS RESERVED</h4>
      </center>
    </footer>
  );
}

export default Footer;
