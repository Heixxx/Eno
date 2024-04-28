import React, { useState, useEffect, useRef, useCallback } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import "./css/panel.css";
import "draft-js/dist/Draft.css"; // Stylowanie edytora
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Załóżmy, że AuthContext jest odpowiednio zdefiniowany

function HandleAdmin() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [windowAdd, setWindowAdd] = useState(false);
    const [windowUpdate, setWindowUpdate] = useState(false);
    const [windowDel, setWindowDel] = useState(false);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [newPassword, setNewPassword] = useState("");
    const [changePass, setchangePass] = useState(false);
    const [windowEdit, setWindowEdit] = useState(false);
    const [pdfs, setPdfs] = useState(Array(5).fill(null));
    const [message, setMessage] = useState("");
    const [sessionTimeLeft, setSessionTimeLeft] = useState(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [additionalImages, setAdditionalImages] = useState(
        Array(5).fill(null)
    );
    const [sortDescending, setSortDescending] = useState(true);
    const isMounted = useRef(true);
    const [lastSavedTitle, setLastSavedTitle] = useState("");
    const [lastSavedText, setLastSavedText] = useState("");
    const handleAdditionalImagesChange = (index) => (e) => {
        const newImages = [...additionalImages];
        newImages[index] = e.target.files[0];
        setAdditionalImages(newImages);
    };
    const handleEditorChange = (state) => {
        setEditorState(state);
    };

    useEffect(() => {
        if (selectedPost && selectedPost.text) {
            const contentState = convertFromRaw(JSON.parse(selectedPost.text));
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [selectedPost]);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }

        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, [isAuthenticated, navigate]);

    const toggleWindowUpd = () => {
        setWindowUpdate(!windowUpdate);
        setSelectedPost(null);
        fetchPosts();
    };

    //TIME
    const calculateTimeLeft = () => {
        const expirationDate = new Date(
            sessionStorage.getItem("tokenExpiration")
        );
        const currentTime = new Date();
        const timeLeft = expirationDate.getTime() - currentTime.getTime();

        const timeLeftInMinutes = Math.floor(timeLeft / 1000 / 60);
        setSessionTimeLeft(timeLeftInMinutes > 0 ? timeLeftInMinutes : 0);
    };
    useEffect(() => {
        extendSession();

        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 1000);

        return () => clearInterval(timer); // Czyszczenie interwału
    }, []);
    const extendSession = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/refreshToken",
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (response.data && response.data.newToken) {
                sessionStorage.setItem("token", response.data.newToken);
                sessionStorage.setItem(
                    "tokenExpiration",
                    response.data.expirationDate
                );
                calculateTimeLeft();
            } else {
                console.error("Invalid response data");
            }
        } catch (error) {
            console.error("Error extending session:", error);
        }
    };
    //Kopia robocza
    useEffect(() => {
        const interval = setInterval(() => {
            const currentContentState = editorState.getCurrentContent();
            const currentText = JSON.stringify(convertToRaw(currentContentState));
            if (currentText !== lastSavedText) {
                saveDraft(title, currentText);
            }
        }, 10000); // 10 sekund

        return () => clearInterval(interval);
    }, [title, editorState, lastSavedText]);

    const saveDraft = async (newTitle, newText) => {
        try {
            await axios.post(
                "http://localhost:8080/api/draft",
                {
                    id: 1,
                    title: newTitle,
                    text: newText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            setLastSavedTitle(newTitle);
            setLastSavedText(newText);
            
        } catch (error) {
            console.error("Error saving draft:", error);
            setMessage("Błąd zapisu kopii roboczej");
        }
    };

    const toggleWindowDel = () => {
        setWindowDel(!windowDel);
        setSelectedPost(null);
    };

    const clearForm = () => {
        setTitle("");
        setText("");
        setImage(null);
    };

    const fetchPosts = useCallback(async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/AllPosts"
            );
            if (isMounted.current) {
                setPosts(response.data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, []);
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };
    const handleLoadDraft = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/draft/1`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
    
            setTitle(response.data.title);
    
            const contentState = convertFromRaw(JSON.parse(response.data.text));
            setEditorState(EditorState.createWithContent(contentState));
    
        } catch (error) {
            console.error("Error loading draft:", error);
        }
    };
    
    useEffect(() => {
        if (selectedPost && selectedPost.text) {
            const contentState = convertFromRaw(JSON.parse(selectedPost.text));
            setEditorState(EditorState.createWithContent(contentState));
        } else if (windowAdd || windowEdit) {
            setEditorState(EditorState.createEmpty());
        }
    }, [selectedPost, windowAdd, windowEdit]);

    const handleEditButtonClick = (post) => {
        setSelectedPost(post);
        setTitle(post.title);
        setText(post.text);
        setWindowEdit(true);

        // Uaktualnij stan edytora tylko jeśli komponent jest zamontowany
        if (isMounted.current) {
            if (post.text) {
                const contentState = convertFromRaw(JSON.parse(post.text));
                setEditorState(EditorState.createWithContent(contentState));
            } else {
                setEditorState(EditorState.createEmpty());
            }
        }
    };

    const Message = ({ message }) => {
        if (!message) return null;
        return <div className="message">{message}</div>;
    };
    const handleChangePassword = async () => {
        const token = sessionStorage.getItem("token");
        try {
            await axios.put(
                "http://localhost:8080/api/changePassword",
                { newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Password changed successfully");
            setMessage("Hasło zmienione pomyślnie!");
            setNewPassword("");
            setchangePass(false); // Zamknij okno po zmianie hasła
        } catch (error) {
            console.error("Error changing password:", error);
            setMessage("Błąd");
        }
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handlePdfChange = (index) => (e) => {
        const newPdfs = [...pdfs];
        newPdfs[index] = e.target.files[0];
        setPdfs(newPdfs);
    };
    const handleDeletePost = async (post) => {
        if (
            window.confirm(`Czy na pewno chcesz skasować post "${post.title}"?`)
        ) {
            const token = sessionStorage.getItem("token");
            try {
                await axios.delete(
                    `http://localhost:8080/api/posts/${post.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Post deleted successfully");
                setMessage("Post skasowany.");
                fetchPosts();
            } catch (error) {
                console.error("Error deleting post:", error);
                setMessage("Błąd");
            }
        }
    };

    useEffect(() => {
        if (message) {
            const msgElement = document.querySelector(".message");
            msgElement.classList.add("show");
            setTimeout(() => {
                msgElement.classList.remove("show");
                setMessage("");
            }, 3000);
        }
    }, [message]);
    const handleCreateOrUpdatePost = async () => {
        const contentState = editorState.getCurrentContent();
        const contentAsRawJSON = convertToRaw(contentState);
        const contentAsString = JSON.stringify(contentAsRawJSON);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", contentAsString);
        if (image) formData.append("image", image);

        // Dodawanie dodatkowych obrazów do FormData
        additionalImages.forEach((image, index) => {
            if (image) {
                formData.append(`additionalImage${index + 1}`, image);
            }
        });

        pdfs.forEach((pdf, index) => {
            if (pdf) {
                formData.append(`pdf${index + 1}`, pdf);
                formData.append(`pdf${index + 1}Name`, pdf.name);
            }
        });

        const token = sessionStorage.getItem("token");
        try {
            const url = selectedPost
                ? `http://localhost:8080/api/updatePost/${selectedPost.id}`
                : "http://localhost:8080/api/createPost";

            await axios({
                method: selectedPost ? "put" : "post",
                url: url,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (isMounted.current) {
                clearForm();
                fetchPosts();
                setMessage("Post dodany.");
                setWindowAdd(false);
                setWindowEdit(false);
            }
        } catch (error) {
            console.error("Error submitting post:", error);
            setMessage("Błąd.");
        }
    };
    const uploadImageCallback = (file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/path_to_your_image_upload_api"); // Zmień na swój endpoint API
            const data = new FormData();
            data.append("image", file);
            xhr.send(data);
            xhr.onload = () => {
                const response = JSON.parse(xhr.responseText);
                resolve({ data: { link: response.imageUrl } }); // response.imageUrl powinno być URL-em obrazu
            };
            xhr.onerror = (error) => reject(error);
            setTimeout(() => {
                const response = { imageUrl: "url_do_obrazu" }; // URL do przesłanego obrazu
                resolve({ data: { link: response.imageUrl } });
            }, 1000);
        });
    };
    return (
        <div className="Panel">
            <div className="Options">
                <Message message={message} />
                <div className="Btns">
                    <div className="sessionTimer">
                        <p>Czas do końca sesji: {sessionTimeLeft} minut</p>
                        <button onClick={extendSession}>Przedłuż sesję</button>
                    </div>
                    {changePass && (
                        <div className="changePass">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nowe hasło"
                            />
                            <button onClick={() => handleChangePassword()}>
                                Zmień hasło
                            </button>
                            <button onClick={() => setchangePass(false)}>
                                anuluj
                            </button>
                        </div>
                    )}

                    {/* Add/Edit Post Window */}
                    {(windowAdd || windowEdit) && (
                        <div
                            className={`Panel${
                                windowAdd ? "Add" : "Edit"
                            } panel`}>
                            <h2 className="title">
                                {selectedPost ? "Edytuj post" : "Nowy post"}
                                <button
                                    onClick={handleLoadDraft}
                                    className="loadDraftBtn button">
                                    Kopia robocza
                                </button>
                            </h2>
                            <input
                                className="titleInput inputs"
                                type="text"
                                placeholder="Tytuł"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={handleEditorChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                toolbar={{
                                    fontSize: {
                                        options: [
                                            8, 9, 10, 11, 12, 14, 16, 18, 20,
                                            24, 30, 36, 48, 60, 72, 96,
                                        ],
                                        image: {
                                            uploadCallback: uploadImageCallback,
                                            alt: {
                                                present: true,
                                                mandatory: false,
                                            },
                                            previewImage: true,
                                            inputAccept:
                                                "image/jpeg,image/jpg,image/png",
                                        },
                                    },
                                }}
                            />
                            <div className="input_container">
                                <input
                                    className="inp inputs"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <span>(Zdjęcie główne)</span>
                            </div>
                            <button
                                onClick={handleCreateOrUpdatePost}
                                className="button inputs btnn">
                                {selectedPost
                                    ? "Zaktualizuj post"
                                    : "Dodaj post"}
                            </button>
                            <div className="pdf">
                                <span className="pdf-span">PDF'y: </span>
                                {pdfs.map((_, index) => (
                                    <input
                                        key={index}
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handlePdfChange(index)}
                                    />
                                ))}
                            </div>
                            <div className="additional-images pdf">
                                <span className="pdf-span">
                                    Zdjęcia opcjonalne:
                                </span>
                                {additionalImages.map((_, index) => (
                                    <input
                                        key={index}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAdditionalImagesChange(
                                            index
                                        )}
                                    />
                                ))}
                            </div>
                            <button
                                className="button inputs btnn"
                                onClick={() => {
                                    setWindowAdd(false);
                                    setWindowEdit(false);
                                    clearForm();
                                }}>
                                Anuluj
                            </button>
                        </div>
                    )}

                    {/* Buttons */}
                    <button
                        onClick={() => setchangePass(true)}
                        className="passBtn button">
                        Zmień hasło
                    </button>
                    <button
                        className="addBtn button"
                        onClick={() => {
                            setWindowAdd(true);
                            setSelectedPost(null);
                            clearForm();
                        }}>
                        Dodaj post
                    </button>
                    <button
                        onClick={toggleWindowUpd}
                        className="editBtn button">
                        Edytuj post
                    </button>
                    <button onClick={toggleWindowDel} className="delBtn button">
                        Wykasuj post
                    </button>
                    <button onClick={handleLogout} className="logout button">
                        Wyloguj
                    </button>

                    {/* Edit Post List Window */}
                    {windowUpdate && (
                        <div className="PanelUpd panel list">
                            <h2>Lista postów do edycji:</h2>
                            <button onClick={() => setSortDescending(true)}>
                                Sortuj od najnowszych
                            </button>
                            <button onClick={() => setSortDescending(false)}>
                                Sortuj od najstarszych
                            </button>
                            <ul>
                                {posts
                                    .sort((a, b) =>
                                        sortDescending
                                            ? new Date(b.createdDate) -
                                              new Date(a.createdDate)
                                            : new Date(a.createdDate) -
                                              new Date(b.createdDate)
                                    )
                                    .map((post) => (
                                        <li key={post.id}>
                                            {post.title} -{" "}
                                            {new Date(
                                                post.createdDate
                                            ).toLocaleDateString("pl-PL")}
                                            <button
                                                onClick={() => {
                                                    handleEditButtonClick(post);
                                                    setWindowUpdate(false);
                                                }}>
                                                Edytuj
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                            <button
                                className=""
                                onClick={() => setWindowUpdate(false)}>
                                Anuluj
                            </button>
                        </div>
                    )}

                    {/* Delete Post List Window */}
                    {windowDel && (
                        <div className="PanelDel panel list">
                            <h2>Wybierz post do usunięcia:</h2>
                            <ul>
                                {posts.map((post) => (
                                    <li key={post.id}>
                                        {post.title} -{" "}
                                        <button
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        `Czy na pewno chcesz skasować post "${post.title}"?`
                                                    )
                                                ) {
                                                    handleDeletePost(post);
                                                    setWindowDel(false);
                                                }
                                            }}>
                                            Usuń
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className=""
                                onClick={() => setWindowDel(false)}>
                                Anuluj
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HandleAdmin;
