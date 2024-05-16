import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    Navigate,
    useNavigate,
    Outlet,
} from "react-router-dom";
import Main from "./Components/Main";
import Admin from "./Components/Admin";
import Posts from "./Components/Post";
import AllPosts from "./Components/AllPosts";
import Logo from "./Components/img/logoeno.jpg";
import "./Components/css/nav.css";
import MysticTours from "./Components/MysticTours";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import Partners from "./Components/Partners";
import Journey from "./Components/Journey";
import Gallery from "./Components/Gallery";
import Foundation from "./Components/Foundation";
import Actions from "./Components/Actions";
import Login from "./Components/Log";
import { AuthProvider, useAuth } from "./Components/AuthContext";

function Page2() {
    return <h2>Strona 2</h2>;
}

function App() {
    const [navMobile, setNavMobile] = useState(false);
    const [showNav, setShowNav] = useState(true);

    const toggleMobileNav = () => {
        setNavMobile(!navMobile);
    };

    const PrivateRoute = () => {
        const { isAuthenticated } = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            if (!isAuthenticated) {
                navigate("/login");
            }
        }, [isAuthenticated, navigate]);

        return isAuthenticated ? <Outlet /> : null;
    };

    return (
        <AuthProvider>
            <Router>
                <div className="navDiv">
                    {showNav ? (
                        <div
                            className={`mobile-panel ${
                                navMobile ? "animation" : ""
                            }`}>
                            <ul>
                                <div className="side side--rep">
                                    <li>
                                        <a
                                            className="special"
                                            href="/"
                                            rel="noopener"
                                            target="_blank"
                                            onClick={toggleMobileNav}>
                                            Wina
                                        </a>
                                        <hr />
                                    </li>
                                    <li className="divImg">
                                        <a
                                            className="link"
                                            href="/#main"
                                            onClick={toggleMobileNav}>
                                            Początek
                                        </a>
                                        <hr />
                                    </li>
                                    <li>
                                        <Link
                                            className="link"
                                            to="/AllPosts"
                                            onClick={toggleMobileNav}>
                                            {" "}
                                            Aktualności
                                        </Link>
                                        <hr />
                                    </li>
                                    <li>
                                        <a
                                            className="link"
                                            href="/#Info"
                                            onClick={toggleMobileNav}>
                                            Galeria
                                        </a>
                                        <hr />
                                    </li>
                                    <li>
                                        <a
                                            className="link"
                                            href="/#Contact"
                                            onClick={toggleMobileNav}>
                                            Kontakt
                                        </a>
                                        <hr />
                                    </li>
                                </div>
                                <div className="side">
                                    <li>
                                        <Link
                                            className="link"
                                            to="/Tours"
                                            onClick={toggleMobileNav}>
                                            Tours
                                        </Link>
                                        <hr />
                                    </li>
                                    <li>
                                        <a
                                            className="link"
                                            href="/#pdf"
                                            onClick={toggleMobileNav}>
                                            Tradycyjne smaki
                                        </a>
                                        <hr />
                                    </li>
                                </div>
                            </ul>
                        </div>
                    ) : null}
                    <div
                        className={`mobile-nav ${
                            navMobile ? "animation-btn" : ""
                        }`}>
                        <button
                            className="mobile-nav__button"
                            onClick={toggleMobileNav}>
                            <div className="Icon"></div>
                        </button>
                    </div>
                    <nav className="nav">
                        <ul>
                            <div className="side side--rep">
                                <li>
                                    <a
                                        href="/"
                                        rel="noopener"
                                        target="_blank">
                                        Salon win
                                    </a>
                                    <hr />
                                </li>
                                <li>
                                    <a className="link" href="/#Info">
                                        Galeria
                                    </a>
                                    <hr />
                                </li>
                                <li>
                                    <a className="link" href="/#Contact">
                                        Kontakt
                                    </a>
                                    <hr />
                                </li>
                            </div>
                            <div className="divImg">
                                <img
                                    className="img"
                                    alt="Zdjęcie z napisem salon win karpackich"
                                    src={Logo}></img>
                                <a className="link" href="/#main"></a>
                            </div>
                            <div className="side">
                                <li>
                                    <Link className="link" to="/Tours">
                                        mystic tours
                                    </Link>
                                    <hr />
                                </li>
                                <li>
                                    <Link className="link" to="/AllPosts">
                                        Aktualności
                                    </Link>
                                    <hr />
                                </li>
                                <li>
                                    <a className="link" href="/#pdf">
                                        Tradycyjne smaki
                                    </a>
                                    <hr />
                                </li>
                            </div>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/Posts" element={<Posts />} />
                        <Route path="/page2" element={<Page2 />} />
                        <Route path="/Privacy" element={<PrivacyPolicy />} />
                        <Route path="/Partners" element={<Partners />} />
                        <Route path="/Journey" element={<Journey />} />
                        <Route path="/Post/:id" element={<Posts />} />
                        <Route path="/AllPosts" element={<AllPosts />} />
                        <Route path="/Tours" element={<MysticTours />} />
                        <Route path="/Gallery" element={<Gallery />} />
                        <Route path="/Foundation" element={<Foundation />} />
                        <Route path="/Actions" element={<Actions />} />
                        <Route path="/Login" element={<Login />} />

                        <Route element={<PrivateRoute />}>
                            <Route path="/Admin" element={<Admin />} />
                        </Route>
                        <Route path="/" element={<Main />} />
                        <Route path="/Tours" render={() => null} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
