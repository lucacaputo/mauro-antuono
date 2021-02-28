import { motion, Variants } from "framer-motion";

type PlusProps = {
    isToggled: boolean,
}

const Plus: React.FC<PlusProps> = ({ isToggled }) => {
    const plusVar: Variants = {
        untoggled: {
            rotate: 0,
        },
        toggled: {
            rotate: isToggled ? 90 : 0
        }
    }
    const minusVar: Variants = {
        untoggled: {
            opacity: 1,
        },
        toggled: {
            opacity: isToggled ? 0 : 1,
            transition: {
                duration: .2
            }
        }
    }
    return (
        <svg
            width="35"
            height="35"
            viewBox="0 0 50 50"
        >
            <motion.rect 
                x="24" 
                y="0"
                width="2"
                height="50"
                fill="#000"
                stroke="none"
                initial="untoggled"
                animate="toggled"
                variants={plusVar}
            />
            <motion.rect
                x="0"
                y="24"
                width="50"
                height="2"
                fill="#000"
                stroke="none"
                initial="untoggled"
                animate="toggled"
                variants={minusVar}
            />
        </svg>
    );
}

export default Plus;