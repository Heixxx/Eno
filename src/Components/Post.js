import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "./css/posts.css";
import "draft-js/dist/Draft.css";

function Post() {
    const { id } = useParams(); // Pobierz `id` z URL
    const [post, setPost] = useState({});
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const pdfs = [post.pdf1, post.pdf2, post.pdf3, post.pdf4, post.pdf5].filter(
        Boolean
    );
    const [isLoading, setIsLoading] = useState(true);
    const [additionalImages, setAdditionalImages] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        window.scrollTo(0, 0);
        axios
            .get(`http://localhost:8080/api/post/${id}`)
            .then((response) => {
                const postData = response.data;
                const pdfs = [
                    { data: postData.pdf1, name: postData.pdf1Name },
                    { data: postData.pdf2, name: postData.pdf2Name },
                    { data: postData.pdf3, name: postData.pdf3Name },
                    { data: postData.pdf4, name: postData.pdf4Name },
                    { data: postData.pdf5, name: postData.pdf5Name },
                    // ... dla pozostałych plików PDF
                ].filter((pdf) => pdf.data);
                const additionalImages = [
                    postData.additionalImage1,
                    postData.additionalImage2,
                    postData.additionalImage3,
                    postData.additionalImage4,
                    postData.additionalImage5,
                ].filter(Boolean); // Filtruj, aby usunąć puste wartości
                if (postData.text) {
                    const contentState = convertFromRaw(
                        JSON.parse(postData.text)
                    );
                    setEditorState(EditorState.createWithContent(contentState));
                }
                setIsLoading(false);
                setAdditionalImages(additionalImages); // Ustaw dodatkowe obrazy
                setPost({ ...postData, pdfs }); // Zaktualizuj stan posta z przetworzonymi danymi PDF
            })
            .catch((error) => {
                console.error("Błąd pobierania danych", error);
                setIsLoading(false);
            });
    }, [id]);

    if (!post) {
        return <div className="Loading">Loading...</div>;
    }
    if (isLoading) {
        return (
            <section className="sectionPost">
                <div className="Post">
                    <div className="Post__container">
                        <div className="Post__container-img skeleton"></div>

                        <h1 className="Post__container-title skeleton"></h1>
                        <p className="Post__created-date skeleton"></p>
                    </div>
                </div>
            </section>
        );
    }
    return (
        <section className="sectionPost">
            <div className="Post">
                <div className="Post__container">
                    {post.image && (
                        <div className="Post__container-img">
                            <img
                                src={`data:image/jpeg;base64,${post.image}`}
                                alt={post.title}
                                className="Post__container-img-image"
                            />
                            <div className="Post__container-img-shadow"></div>
                        </div>
                    )}

                    <h1 className="Post__container-title">{post.title}</h1>
                    <p className="Post__created-date">
                        {new Date(post.createdDate).toLocaleDateString("pl-PL")}
                    </p>
                    <Editor
                        className="Post__container-text"
                        editorState={editorState}
                        readOnly={true}
                    />

                    {pdfs.length > 0 && (
                        <div className="pdf">
                            <span>Pliki do pobrania:</span>
                            {post.pdfs.map((pdf, index) => (
                                <a
                                    key={index}
                                    href={`data:application/pdf;base64,${pdf.data}`}
                                    download={pdf.name || `Plik${index + 1}`}>
                                    {pdf.name || `Plik${index + 1}`}
                                </a>
                            ))}
                        </div>
                    )}
                    {additionalImages.map((image, index) => (
                        <div key={index} className="Post__additional-img">
                            <img
                                src={`data:image/jpeg;base64,${image}`}
                                alt={`Zdjęcie ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Post;
