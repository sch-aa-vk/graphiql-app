import rsschool from '../../assets/icons/rs.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__container">
          <p className="footer__date">2023</p>
          <div className="footer__authors">
            <a href="https://github.com/sch-aa-vk">sch-aa-vk</a>
            <a href="https://github.com/redcliphaloe">redcliphaloe</a>
            <a href="https://github.com/EvgeniaM6">EvgeniaM6</a>
          </div>
          <a href="https://rs.school" className="footer__logo">
            <img src={rsschool} alt="rsschool" className="footer__logo-img" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
