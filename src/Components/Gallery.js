import "./css/gallery.css";
import img2 from "./img/carousel_img/2.jpg";
import img3 from "./img/carousel_img/3.jpg";
import img4 from "./img/carousel_img/4.jpg";
import img5 from "./img/carousel_img/5.jpg";
import img6 from "./img/carousel_img/6.jpg";
import img7 from "./img/carousel_img/7.JPG";
import img8 from "./img/carousel_img/8.JPG";
import img9 from "./img/carousel_img/9.jpg";
import img10 from "./img/carousel_img/10.jpg";
import img11 from "./img/carousel_img/11.jpg";
import img12 from "./img/carousel_img/12.jpg";
import img111 from "./img/carousel_img/111.JPG";
import imgDK from "./img/carousel_img/DK.jpg";

import React, { useEffect } from "react";
import Aos from "aos";

function Gallery() {
    useEffect(() => {
        Aos.init({
            duration: 1000,
        });
    }, []);

    return (
        <section className="sectionGallery">
            <div className="picture">
                <img src={img2}></img>
            </div>
            <div className="picture">
                <img src={img3}></img>
            </div>
            <div className="picture">
                <img src={img4}></img>
            </div>
            <div className="picture">
                <img src={img5}></img>
            </div>
        </section>
    );
}

export default Gallery;
