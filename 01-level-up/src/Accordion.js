import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
            style={{ overflow: 'hidden' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              vero fugit voluptatum quae alias quasi rem aliquam illum
              repudiandae repellat magnam, nesciunt provident nulla sequi
              numquam minima fugiat repellendus eaque!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default Accordion;
