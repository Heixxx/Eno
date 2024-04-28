import "./css/MysticTours.css";
import React, { useEffect } from "react";
// import Zameksmall from './img/mysticTours/Zameksmall.jpg'

const images = {
    Zamekbig: require("./img/mysticTours/Zamekbig.jpg"),
    Bliznebig: require("./img/mysticTours/bliznebig.jpg"),
    haczowbig: require("./img/mysticTours/haczowbig.jpg"),
    dkbig: require("./img/mysticTours/dkbig.jpg"),
    Odrzykonbig: require("./img/mysticTours/kamieniecbig.jpg"),
    Przadkibig: require("./img/mysticTours/przadkibig.jpg"),
    Krosnobig: require("./img/mysticTours/krosnobig.jpg"),
    Bobrkabig: require("./img/mysticTours/bóbrkabig.jpg"),
    Komanczabig: require("./img/mysticTours/komańczabig.jpg"),
    Turzanskbig: require("./img/mysticTours/turzańskbig.jpg"),
    Medzilaborcebig: require("./img/mysticTours/medzilaborcebig.jpg"),
    Tokaybig: require("./img/mysticTours/tokaybig.jpg"),
    Koszycebig: require("./img/mysticTours/koszycebig.jpg"),
    Jasowbig: require("./img/mysticTours/jaskiniabig.jpg"),
    Smolnikbig: require("./img/mysticTours/smolnikbig.jpg"),
    Ursabig: require("./img/mysticTours/ursabig.jpg"),
    Sanokbig: require("./img/mysticTours/sanokbig.jpeg"),
};
function MysticTours() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <section className="section">
            <div className="table">
                <div className="table__container img1">
                    <img
                        className="table__container-img"
                        src={images.Zamekbig}
                        alt="Zamek w Łańcucie"></img>
                    <h2 className="table__container-title">Zamek w Łańcucie</h2>
                    <span className="table__container-text">
                        jedna z najpiękniejszych siedzi arystokratycznych w
                        Polsce
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Zamek_w_%C5%81a%C5%84cucie">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img2">
                    <img
                        className="table__container-img"
                        src={images.Bliznebig}
                        alt="Blizne kościół"></img>
                    <h2 className="table__container-title">Blizne</h2>
                    <span className="table__container-text">
                        średniowieczny kościół drewniany (UNESCO)
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Ko%C5%9Bci%C3%B3%C5%82_Wszystkich_%C5%9Awi%C4%99tych_w_Bliznem">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img3">
                    <img
                        className="table__container-img"
                        src={images.haczowbig}
                        alt="Haczów, kościół drewniany"></img>
                    <h2 className="table__container-title">Haczów</h2>
                    <span className="table__container-text">
                        największy i najstarszy średniowieczny Kościół drewniany
                        w Europie zbudowany w technice zrębowej (UNESCO)
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Ko%C5%9Bci%C3%B3%C5%82_Wniebowzi%C4%99cia_Naj%C5%9Bwi%C4%99tszej_Maryi_Panny_w_Haczowie">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img4">
                    <img
                        className="table__container-img"
                        src={images.dkbig}
                        alt="Kombornia"></img>
                    <h2 className="table__container-title">Kombornia</h2>
                    <span className="table__container-text">
                        odrestaurowany zespół rezydencjonalnym XVII – XIX w. -
                        Wellness i ChocoWi-ne SPA
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://www.dworkombornia.pl/pl/galeria/category/1-dwor-w-jesiennej-szacie-z-lotu-ptaka">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img5">
                    <img
                        className="table__container-img"
                        src={images.Odrzykonbig}
                        alt="Ruiny zamku Odrzykoń"></img>
                    <h2 className="table__container-title">Odrzykoń</h2>
                    <span className="table__container-text">
                        ruiny zamku Kamieniec
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Zamek_Kamieniec">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img6">
                    <img
                        className="table__container-img"
                        src={images.Przadkibig}
                        alt="Prządki"></img>
                    <h2 className="table__container-title">Prządki</h2>
                    <span className="table__container-text">
                        rezerwat skalnych ostańców
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://bliskiepodroze.frysztak.pl/portfolio/rezerwat-przadki/">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img7">
                    <img
                        className="table__container-img"
                        src={images.Krosnobig}
                        alt="Krosno"></img>
                    <h2 className="table__container-title">Krosno</h2>
                    <span className="table__container-text">
                        Poznajemy magię szkła – od ziarnka piasku po kieliszek i
                        szklane rzeźby - centrum dziedzictwa szkła w Krośnie
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Krosno">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img8">
                    <img
                        className="table__container-img"
                        src={images.Bobrkabig}
                        alt="Bóbrka"></img>
                    <h2 className="table__container-title">Bóbrka</h2>
                    <span className="table__container-text">
                        Galicyjski Teksas - jedyne muzeum położone na terenie
                        czynnej do dziś kopalni ropy naftowej, założonej przez
                        wynalazcę lampy naftowej Ignacego Łukasiewicza w r 1854.
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.m.wikipedia.org/wiki/Plik:Skansen_Bobrka_2.jpg">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img9">
                    <img
                        className="table__container-img"
                        src={images.Komanczabig}
                        alt="Komańcza, wieś"></img>
                    <h2 className="table__container-title">Komańcza</h2>
                    <span className="table__container-text">
                        wieś na szlaku architektury drewnianej z dwoma cerkwiami
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Cerkiew_Opieki_Matki_Bo%C5%BCej_w_Koma%C5%84czy#/media/Plik:Koma%C5%84cza,_cerkiew_Opieki_Matki_Bo%C5%BCej_(odbudowana)_(HB14)
                            .jpg">
                            Źródło
                        </a>
                    </div>
                </div>
                <div className="table__container img10">
                    <img
                        className="table__container-img"
                        src={images.Turzanskbig}
                        alt="Turzańsk"></img>
                    <h2 className="table__container-title">Turzańsk</h2>
                    <span className="table__container-text">
                        drewniana filialna cerkiew prawosławna (w swoich
                        dziejach służyła też grekoka-tolikom i rzymskim
                        katolikom) wzniesiona w latach 1801-1803 (UNESCO)
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.m.wikivoyage.org/wiki/Plik:Turza%C5%84sk,_cerkiew_%C5%9Bw._Micha%C5%82a_Archanio%C5%82a_%282%29.jpg">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img11">
                    <img
                        className="table__container-img"
                        src={images.Medzilaborcebig}
                        alt="Medzilaborce"></img>
                    <h2 className="table__container-title">Medzilaborce</h2>
                    <span className="table__container-text">
                        Muzeum Endy Warhola
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.m.wikipedia.org/wiki/Plik:Medzilaborce_muzeum_Andy%27ego_Warhola_20.08.08_p.jpg">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img12">
                    <img
                        className="table__container-img"
                        src={images.Tokaybig}
                        alt="Tokay"></img>
                    <h2 className="table__container-title">Tokay</h2>
                    <span className="table__container-text">
                        drążone w tufie piwnice i degustacja win z Tokaju
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.frwiki.wiki/wiki/Tokay">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img13">
                    <img
                        className="table__container-img"
                        src={images.Koszycebig}
                        alt="Koszyce,"></img>
                    <h2 className="table__container-title">Koszyce</h2>
                    <span className="table__container-text">
                        ważne skupisko zabytków na Słowacji oraz miejsce
                        znalezienia i prezentacji naj-istotniejszego złotego
                        skarbu w Europie
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://slovakia.travel/pl/koszyce-miejski-rezerwat-zabytkow">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img14">
                    <img
                        className="table__container-img"
                        src={images.Jasowbig}
                        alt="Jasow, jaskinia"></img>
                    <h2 className="table__container-title">Jasow</h2>
                    <span className="table__container-text">
                        Jaskinia (UNESCO)
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Jaskinia_Jasowska">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img15">
                    <img
                        className="table__container-img"
                        src={images.Smolnikbig}
                        alt="Cerkiew, Smolnik"></img>
                    <h2 className="table__container-title">Smolnik</h2>
                    <span className="table__container-text">
                        dawna cerkiew bojkowska (UNESCO)
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Cerkiew_%C5%9Bw._Micha%C5%82a_Archanio%C5%82a_w_Smolniku">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img16">
                    <img
                        className="table__container-img"
                        src={images.Ursabig}
                        alt="Ursa, Maior"></img>
                    <h2 className="table__container-title">Ursa</h2>
                    <span className="table__container-text">
                        Degustacja piw regionalnych w Ursa Maior w Uchercach
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Centrum_Ursa_Maior#/media/Plik:Ursa_Maior_brewery_in_Uherce_Mineralne_(2023).jpg">
                            Źródło
                            
                        </a>
                    </div>
                </div>
                <div className="table__container img17">
                    <img
                        className="table__container-img"
                        src={images.Sanokbig}
                        alt="Sanok, Muzeum"></img>
                    <h2 className="table__container-title">Sanok</h2>
                    <span className="table__container-text">
                        Muzeum Historyczne w Sanoku - (kolekcja ikon i prac Z.
                        Beksińskiego)
                    </span>
                    <div className="table__container-source">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className=""
                            href="https://pl.wikipedia.org/wiki/Muzeum_Historyczne_w_Sanoku#/media/Plik:Sanok31DSC_1010.JPG">
                            Źródło
                            
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MysticTours;
