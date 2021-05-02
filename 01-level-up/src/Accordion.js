import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
};

const Accordion = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <article>
      <h2 role="button" onClick={() => setIsToggled((prev) => !prev)}>
        The Heading
      </h2>
      <AnimatePresence>
        {isToggled && (
          <motion.div
            variants={variants}
            style={{ overflow: 'hidden' }}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloribus alias hic dolore pariatur quibusdam? Magni repellendus
              harum a et ducimus! Eveniet consequatur minus, illum doloremque
              nemo et itaque molestias laborum. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sunt distinctio, dolorem, optio
              consequuntur labore voluptas omnis explicabo reiciendis rem
              excepturi aperiam rerum. Odit labore vitae omnis numquam? Sunt,
              similique temporibus?
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default Accordion;
