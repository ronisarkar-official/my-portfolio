import React from 'react';

const Footer = () => {
  return (
    <>
      <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
        <div className="text-white-500 flex gap-2">
          <p>Terms & Conditions</p> | <p>Privacy Policy</p>
        </div>
        <div className="flex gap-3">
          <div className="social-icon flex items-center justify-center">
            <a href="https://github.com/ronisarkar-official" target="_blank" rel="noopener noreferrer">
              <img src="/assets/github.svg" alt="GitHub" className="w-8 h-8" />
            </a>
          </div>

          <div className="social-icon flex items-center justify-center">
            <a href="https://x.com/ronisarkarDev" target="_blank" rel="noopener noreferrer">
              <img src="/assets/twitter.svg" alt="GitHub" className="w-8 h-8" />
            </a>
          </div>
          <div className="social-icon flex items-center justify-center">
            <a href="https://www.linkedin.com/in/ronisarkar/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/linkedin.svg" alt="Linkedin" className="w-8 h-8" />
            </a>
          </div>
        </div>
        <p className="text-white-500">&copy; 2025 Roni Sarkar. All rights reserved. </p>
      </section>
      
    </>
  );
};

export default Footer;
