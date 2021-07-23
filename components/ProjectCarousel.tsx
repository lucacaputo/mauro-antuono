import Carousel from "nuka-carousel";
import { API_BASE } from "../helpers";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from "../styles/projectcarousel.module.css";

type CarouselProps = {
    initialSlideId?: string,
    slides: ({
        url: string,
        _id: string
    } & any)[]
}

const ProjectCarousel: React.FC<CarouselProps> = ({ slides }) => {
    return (
        <Carousel
            height='50vh'
            renderCenterLeftControls={({ previousSlide }) => (
                <button className={styles.controls} onClick={previousSlide}>
                    <AiOutlineLeft size={30} />
                </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
                <button className={styles.controls} onClick={nextSlide}>
                    <AiOutlineRight size={30} />
                </button>
            )}
        >
            {
                slides.map(s => (
                    <div 
                        className={styles.slide} 
                        style={{ backgroundImage: `url('${API_BASE + '/' + s.url.replace(/\\/gm, '/')}')` }} 
                        key={s._id}
                    />
                ))
            }
        </Carousel>
    );
}

export default ProjectCarousel;