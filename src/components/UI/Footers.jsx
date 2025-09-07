import footerContact from "../../API/FooterApi.json";
import { IoCallSharp } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { TbMailPlus } from "react-icons/tb";

import { NavLink } from "react-router-dom";


export const Footers = () => {

  const footerIcon = {
    MdPlace: <MdPlace />,
    IoCallSharp: <IoCallSharp />,
    TbMailPlus: <TbMailPlus />,
  };

  return (
    <footer className="footer-section">
      <div className="container grid grid-three-cols">
        {footerContact.map((curData, index) => {
          const { icon, title, details } = curData;

       
          let href = "#";
          if (title.toLowerCase().includes("find")) {
         
            href = `https://www.google.com/maps?q=${encodeURIComponent(details)}`;
          } else if (title.toLowerCase().includes("call")) {
       
            const phone = details.replace(/\D/g, "");
            href = `https://wa.me/${phone}`;
          } else if (title.toLowerCase().includes("mail")) {
           
            href = `mailto:${details}`;
          }

          return (
            <div className="footer-contact" key={index}>
              <div className="icon">{footerIcon[icon]}</div>
              <div className="footer-contact-text">
                <p>{title}</p>
                <p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {details}
                  </a>
                </p>
              </div>
            </div>
          );
        })}
      </div>


      <div className="copyright-area">
        <div className="container">
          <div className="grid grid-two-cols">
            <div className="copyright-text">
              <p>
                Copyright &copy; 2025, All Right Reserved
                <NavLink to="/" target="_blank">
                  WorldAtlas
                </NavLink>
              </p>
            </div>

            <div className="footer-menu">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>

                <li>
                  <NavLink
                    to="https://www.instagram.com/samariasultan954/"
                    target="_blank"
                  >
                    Social
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="mailto:samariasultan954@gmail.com"
                    target="_blank"
                  >
                    Email
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}