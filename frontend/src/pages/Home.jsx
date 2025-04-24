import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for redirecting
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [editingNoteId, setEditingNoteId] = useState(null);
    const navigate = useNavigate(); // use navigate hook

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const handleEdit = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditingNoteId(note.id);
    };

    const createOrUpdateNote = (e) => {
        e.preventDefault();

        if (editingNoteId) {
            api
                .put(`/api/notes/update/${editingNoteId}/`, { title, content })
                .then((res) => {
                    if (res.status === 200) alert("Note updated!");
                    else alert("Failed to update note.");
                    resetForm();
                    getNotes();
                })
                .catch((err) => alert(err));
        } else {
            api
                .post("/api/notes/", { title, content })
                .then((res) => {
                    if (res.status === 201) alert("Note created!");
                    else alert("Failed to create note.");
                    resetForm();
                    getNotes();
                })
                .catch((err) => alert(err));
        }
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setEditingNoteId(null);
    };

    const logout = () => {
        localStorage.removeItem("authTokens"); // or whatever key you're using
        navigate("/login"); // redirect to login
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "green"  }}>
                <h2>QuickNote</h2>
                <button onClick={logout} className="logout-button">Logout</button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4>Note-List</h4>
            </div>
            {notes.map((note) => (
                <Note
                    key={note.id}
                    note={note}
                    onEdit={handleEdit}
                    onDelete={deleteNote}
                    editingNoteId={editingNoteId}
                />
            ))}

            <h2>{editingNoteId ? "Edit Note" : "Create a Note"}</h2>
            <form onSubmit={createOrUpdateNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value={editingNoteId ? "Update" : "Submit"} />
                {editingNoteId && <button onClick={resetForm}>Cancel</button>}
            </form>
        </div>
    );
}

export default Home;
