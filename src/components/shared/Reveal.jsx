import { motion, useReducedMotion } from "framer-motion";

// Fades children up into view the first time they scroll on screen.
const Reveal = ({ children, delay = 0, y = 20, className, as = "div" }) => {
    const reduce = useReducedMotion();
    const Component = motion[as];

    return (
        <Component
            className={className}
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </Component>
    );
};

export default Reveal;
