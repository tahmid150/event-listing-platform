const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-10">
      <div className="text-center py-4 text-sm">
        © {new Date().getFullYear()} Eventify
      </div>
    </footer>
  );
};

export default Footer;
