import React, { useEffect, useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import { useLocation, Link } from "react-router-dom";

import tower from "./img/Zamek.jpg";
import arrow from "./icons/chevron-down.svg";
import eno from "./img/logoeno.jpg";
import "./css/style.css";
import "./css/carousele.css";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import dwor from "./img/dwor.png";
import polishflavors from "./img/polishflavor.png";
import choco from "./img/choco.png";
import skl from "./img/sklep.jpg";
import dwork from "./img/mysticTours/dkbig.jpg";

import pdf from "../Components/TRADYCYJNE-SMAKI-KARPAT.pdf";

function Main() {
    const location = useLocation();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [posts, setPosts] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const currentYear = new Date().getFullYear();
    const [activeSlideIndexMain, setActiveSlideIndexMain] = useState(0);
    const [message, setMessage] = useState("");

    const convertDraftJsonToHtml = (jsonString) => {
        try {
            const contentState = convertFromRaw(JSON.parse(jsonString));
            return stateToHTML(contentState);
        } catch (e) {
            console.error("Błąd konwersji JSON na HTML", e);
            return ""; // lub zwróć domyślny tekst
        }
    };

    useEffect(() => {
        Aos.init({
            duration: 1000,
        });
        axios
            .get("http://localhost:8080/api/getLatestPosts")
            .then((response) => {
                const updatedPosts = response.data.map((post) => ({
                    ...post,
                    text: convertDraftJsonToHtml(post.text), // Konwersja JSON na HTML
                }));
                setPosts(updatedPosts);
                const imagePromises = response.data.map((imageBytes) => {
                    const blob = new Blob([imageBytes]);
                    return URL.createObjectURL(blob);
                });
                Promise.all(imagePromises)
                    .then((urls) => {
                        setImageURLs(urls);
                    })
                    .catch((error) => {
                        console.error("Błąd przekształcania obrazów", error);
                    });
            })
            .catch((error) => {
                console.error("Błąd pobierania danych", error);
            });
    }, []);
    return (
        <div className={"main"} id="main">
            <section className="sectionOne">
                <div className="section">
                    <h1 className="enotourism">
                        <p>Enoturystyka - Odkrywaj Świat Wina i Kultury</p>
                        <hr></hr>
                    </h1>
                    <div className="carouselReact" data-aos="fade-center">
                        <ReactSimplyCarousel
                            activeSlideIndex={activeSlideIndexMain}
                            onRequestChange={setActiveSlideIndexMain}
                            updateOnItemClick={true}
                            itemsToShow={1}
                            autoplay={true}
                            disableSwipeByTouch={true}
                            disableSwipeByMouse={true}
                            itemsToScroll={1}
                            speed={600}
                            delay={3500}
                            easing="linear">
                            <div className="carousel">
                                <img
                                    className="carousel__img"
                                    src={tower}
                                    alt="Zamek"
                                />
                                <div className="carousel__img--shadows"></div>
                                <div className="text">
                                    <h2 className="text__title">
                                        Zamek w łańcucie
                                    </h2>
                                    <div className="text__text">
                                        <span>
                                            <p className="special">
                                                Carpatian mystic tours -
                                            </p>
                                            Zmysłowa prodóż po karpackich
                                            szlakach Zapraszamy Państwa do
                                            udziału w unikalnej podróży zmysłów,
                                            będącej jednocześnie przerwą z dala
                                            od męczącej codzienności.
                                        </span>
                                    </div>
                                    <a
                                        className="carousel__btn"
                                        href="/Tours"
                                        rel="noopener">
                                        <span>Dowiedz się więcej</span>
                                    </a>
                                </div>
                            </div>

                            {/* Slajd 2 */}
                            <div className="carousel">
                                <img
                                    className="carousel__img skl"
                                    src={skl}
                                    alt="Sklep"
                                />
                                <div className="carousel__img--shadows"></div>
                                <div className="text">
                                    <h2 className="text__title">
                                        Salon{" "}
                                        <span className="special">
                                            krapackich
                                        </span>{" "}
                                        win
                                    </h2>
                                    <div className="text__text">
                                        <span>
                                            Serdecznie zapraszamy do naszego{" "}
                                            <span className="special">
                                                Salonu Win
                                            </span>{" "}
                                            na niezapomnianą podróż po świecie
                                            lokalnych win! Przyjdź, aby
                                            doświadczyć wyjątkowej degustacji i
                                            odkryć bogactwo smaków karpackich
                                            winnic. Zanurz się w kulturę wina i
                                            smak przygody!
                                        </span>
                                    </div>
                                    <a
                                        rel="noopener"
                                        target="_blank"
                                        className="carousel__btn"
                                        href="https://butikdworski.pl/">
                                        <span>Dowiedz się więcej</span>
                                    </a>
                                </div>
                            </div>
                            <div className="carousel">
                                <img
                                    className="carousel__img dwork"
                                    src={dwork}
                                    alt="Dwor kombornia"
                                />
                                <div className="carousel__img--shadows"></div>
                                <div className="text">
                                    <h2 className="text__title">
                                        Dwór kombornia
                                    </h2>
                                    <div className="text__text">
                                        <span>
                                            Na szlaku{" "}
                                            <p className="special">
                                                Carpathian Mystic Tours
                                            </p>{" "}
                                            zapraszamy do odpoczynku w dworze
                                            kombornia. Jest to jeden z najlepiej
                                            zachowanych zespołów
                                            rezydencjonalnych w
                                            południowo-wschodniej Polsce.
                                            Kompleks zawiera Hotel & SPA, salon
                                            win karpackich oraz restaurację
                                            Magnolia.
                                        </span>
                                    </div>
                                    <a
                                        className="carousel__btn"
                                        href="https://www.dworkombornia.pl/pl/"
                                        rel="noopener"
                                        target="_blank">
                                        <span>Dowiedz się więcej</span>
                                    </a>
                                </div>
                            </div>
                        </ReactSimplyCarousel>
                    </div>
                </div>
            </section>
            <section className="sectionTwo" id="News">
                <img className="arrow" src={arrow} />
                <div className="section">
                    <div className="section__title">
                        <p className="ptitle">Aktualności</p>
                    </div>
                    <div className="section__posts" data-aos="fade-left">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="section__pos first"
                                data-aos="fade-left">
                                <div className="section__post">
                                    {post.image && (
                                        <img
                                            className="carousel__img"
                                            src={`data:image/jpeg;base64,${post.image}`} // Zakładając, że obrazek jest w formacie JPEG
                                            alt={post.title}
                                        />
                                    )}
                                    <hr></hr>
                                    <div className="section__post_special_text">
                                        <h4>{post.title.slice(0, 40)}..</h4>
                                    </div>
                                    <div className="section__post_text">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: post.text.slice(0, 40),
                                            }}></p>
                                    </div>
                                    <Link
                                        to={`/Post/${post.id}`}
                                        className="section__post_more">
                                        <button>Zobacz więcej</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        <div className="section__postBtn">
                            <a className="section__post-btn" href="/allPosts">
                                <p>Zobacz wszystkie</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sectionThree" id="Info">
                <div className="section">
                    <div className="bgg"></div>
                    <div className="section__title">
                        <p className="ptitle">Galeria</p>
                    </div>
                    <ReactSimplyCarousel
                        activeSlideIndex={activeSlideIndex}
                        onRequestChange={setActiveSlideIndex}
                        itemsToShow={1}
                        // autoplay={true}
                        // delay={2000}
                        itemsToScroll={1}
                        forwardBtnProps={{
                            //here you can also pass className, or any other button element attributes
                            className: "section_btn",
                            style: {
                                alignSelf: "center",
                                background: "none",
                                border: "none",
                                color: "black",
                                cursor: "pointer",
                                fontSize: "40px",
                                height: "40%",
                                lineHeight: 1,
                                textAlign: "center",
                                padding: ".5em",
                                width: 30,
                            },
                            children: <span>{`>`}</span>,
                        }}
                        backwardBtnProps={{
                            //here you can also pass className, or any other button element attributes
                            className: "section_btn",
                            style: {
                                alignSelf: "center",
                                background: "none",
                                border: "none",
                                color: "black",
                                cursor: "pointer",
                                fontSize: "40px",
                                height: "40%",
                                lineHeight: 1,
                                textAlign: "center",
                                padding: ".5em",
                                width: 30,
                            },
                            children: <span>{`<`}</span>,
                        }}
                        responsiveProps={[
                            {
                                itemsToShow: 1,
                                itemsToScroll: 1,
                                minWidth: 1200,
                            },
                        ]}
                        speed={300}
                        easing="linear">
                        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}

                        <img
                            className="carousele c1"
                            data-aos="fade-left"></img>
                        <img className="carousele c2"></img>
                        <img className="carousele c3"></img>
                    </ReactSimplyCarousel>
                    <a className="section__button">
                        <a href="/Gallery">Zobacz więcej zdjęć</a>
                        <hr></hr>
                    </a>
                </div>
            </section>
            <section className="sectionPDF" id="pdf">
                <div className="sect">
                    <h2 className="title">
                        <span>tradycyjne smaki karpat</span>
                    </h2>
                    <div className="container">
                        <div className="text-btn">
                            <span>
                                Odkryj kulinarne tajemnice Karpat- Pobierz
                                przewodnik w
                            </span>
                            <button className="btn">
                                 formacie PDF
                                <hr></hr>
                            </button>
                            <span><div className="img"></div> już teraz! </span>
                            
                        </div>
                    </div>
                    <div className="container">
                        <div className="text">
                            <span>
                                TRADYCYJNE SMAKI KARPAT DZIEDZICTWO POGRANICZA
                                NA RZECZ ROZWOJU
                            </span>
                        </div>
                        <div className="text">
                            <span>
                                Cel Ogólny projektu to Ocalenie od zapomnienia i
                                upowszechnienie wiedzy o tradycyjnych produktach
                                kulinarnych i winiarskich pogranicza
                                polsko-słowackiego
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sectionFourth" id="aboutUs">
                <div className="sectionf">
                    <h2>
                        <p className="ptitle">o fundacji</p>
                    </h2>
                    <div className="sectionf__all">
                        <div className="sectionf__all-aboutText">
                            <p>
                                Fundacja ENO Carpathia powstała w 2013 roku z
                                inicjatywy fascynatów, zaangażowanych w
                                budowanie potencjału turystycznego regionu w
                                oparciu o kulturę wina jaka powstała i rozwija
                                się na całym obszarze Karpat.
                            </p>
                        </div>
                        <img
                            className="sectionf__all-img"
                            alt="Fundacja EnoCarpatian"
                            src={eno}></img>
                        <div className="sectionf__Btns">
                            <a
                                className="sectionf__Btns-Btn"
                                href="/Foundation">
                                <p className="sectionf__Btns-Btn-text">
                                    statut fundacji
                                </p>
                            </a>
                        </div>
                        <div className="sectionf__Btns">
                            <a className="sectionf__Btns-Btn" href="/Actions">
                                <p className="sectionf__Btns-Btn-text">
                                    działania
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="otherWebsites">
                <a
                    href="https://rsf.pl/pl/polish-flavors"
                    rel="noopener"
                    target="_blank">
                    <img src={polishflavors}></img>
                </a>
                <a
                    href="https://www.dworkombornia.pl/pl/"
                    rel="noopener"
                    target="_blank">
                    <img src={dwor}></img>
                </a>
                <a
                    href="https://rsf.pl/pl/chocowine"
                    rel="noopener"
                    target="_blank">
                    <img src={choco}></img>
                </a>
            </section>
            <footer className="sectionFooter" id="Contact">
                <div className="section">
                    <h2 className="section-title">
                        <div className="image"></div>
                    </h2>
                    <div className="section-btns">
                        <a href="/Journey">
                            <p>Dojazd</p>
                        </a>
                        <a href="/Privacy">
                            <p>Polityka prywatności</p>
                        </a>
                        <a href="/Partners">
                            <p>Partnerzy</p>
                        </a>
                    </div>
                    <div className="section__Info">
                        <div className="section__Info-title">
                            <p>Fundacja ENO Carpathian:</p>
                        </div>
                        <div className="section__Info-info">
                            <p>Ul. Dworska 52, 38-420 Korczyna</p>
                        </div>
                        <div className="section__Info-info">
                            <p>Tel.:(+48) 13 435 42 89</p>
                        </div>
                        <div className="section__Info-info">
                            <p>Konto: 38109025900000000144519613</p>
                        </div>
                        <div className="section__Info-info">
                            <p>fundacja@enocarpathian.eu</p>
                        </div>
                    </div>
                    <div className="section__Info">
                        <div className="section__Info-title">
                            <p>Dystrybucja win:</p>
                        </div>
                        <div className="section__Info-info">
                            <p>RSF Sp. z.o.o</p>
                        </div>
                        <div className="section__Info-info">
                            <p>Kontakt dla zamówień detalicznych:</p>
                        </div>
                        <div className="section__Info-info">
                            <p>wino@SalonWinKarpackich.pl</p>
                        </div>
                        <div className="section__Info-info">
                            <p>
                                Kontakt dla zamówień hurtowych i HoReCa:
                                biuro@RSF.pl
                            </p>
                        </div>
                        <div className="section__Info-info">
                            <p>RSF Sp z.o.o. Kombornia 1, 38-420 Korczyna,</p>
                        </div>
                        <div className="section__Info-info">
                            <p>Tel.:(+48) 13 435 42 89</p>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="end">
                <p>Wszelkie prawa zastrzeżone @{currentYear}</p>
            </div>
        </div>
    );
}

export default Main;
