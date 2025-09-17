export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>© {new Date().getFullYear()} AW Designer</div>
        {/* <nav className="footer__links">
          <a href="#intro">Intro</a>
          <a href="#about">About Us</a>
          <a href="#expertise">Our Expertise</a>
          <a href="#work">Our Creation</a>
          <a href="#contact">Contact</a>
        </nav> */}
      </div>
    </footer>
  )
}