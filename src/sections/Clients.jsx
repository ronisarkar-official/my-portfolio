import React from 'react';
import { motion } from 'framer-motion';

import { clientReviews } from '../constants';

const Clients = () => {
  return (
    <section className="c-space my-20">
      <h3 className="head-text">Here from My Clients</h3>
      <div className="client-container">
        {clientReviews.map(({ id, name, review, img, position }) => (
          <motion.div
            key={id}
            className="client-review"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div>
              <p className="text-white font-light">{review}</p>
              <div className="client-content">
                <div className="flex gap-3">
                  <img src={img} alt={name} className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <p className="font-semibold text-white-800">{name}</p>
                    <p className="text-white-500 md:text-base text-sm font-light">{position}</p>
                  </div>
                </div>
                <div className="flex self-end items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <img key={index} src="assets/star.png" alt="star" className="w-5 h-5" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
