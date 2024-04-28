import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/allPosts.css";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 9;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/AllPosts`)
            .then((response) => {
                const updatedPosts = response.data.map((post) => {
                    return {
                        ...post,
                        text: convertDraftJsonToHtml(post.text),
                    };
                });
                setPosts(updatedPosts);
            })
            .catch((error) => {
                console.error("Błąd pobierania danych", error);
            });
    }, []);
    const convertDraftJsonToHtml = (jsonString) => {
        try {
            const contentState = convertFromRaw(JSON.parse(jsonString));
            return stateToHTML(contentState);
        } catch (e) {
            console.error("Błąd konwersji JSON na HTML", e);
            return ""; // lub zwróć domyślny tekst
        }
    };

    const handleNextPage = () => {
        if (endIndex < posts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const currentPosts = posts.slice(startIndex, endIndex);

    return (
        <section className="sectionPosts">
            {currentPosts.map((post) => (
                <div className="Postx" key={post.id}>
                    <img
                        className="Postx__img"
                        src={`data:image/jpeg;base64,${post.image}`} // Zakładając, że obrazek jest w formacie JPEG
                        alt={post.title}></img>
                    <h2 className="Postx__title">{post.title}</h2>
                    <p className="Postx__text"
                        dangerouslySetInnerHTML={{
                            __html: post.text.slice(0,200)
                        }}></p>
                    <Link to={`/Post/${post.id}`} className="Postx__seeMore">
                        Zobacz więcej
                    </Link>
                </div>
            ))}
            <div className="next">
                {currentPage > 1 && (
                    <button onClick={handlePreviousPage}>Poprzednia</button>
                )}
                {endIndex < posts.length && (
                    <button onClick={handleNextPage}>Następna</button>
                )}
            </div>
        </section>
    );
}

export default AllPosts;
