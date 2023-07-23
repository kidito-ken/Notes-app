import { useEffect, useState } from "react";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditNote from "./AddEditNote";
import AddNote from "./AddEditNote";
import { Note as NoteModel } from "../models/note";
import styleUtils from "../styles/utils.module.css";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import Note from "./Note";

const NotesPageLoggedInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setnotesLoading] = useState(true);
    const [showNotesLoadingError, setshowNotesLoadingError] = useState(false);

    const [showAddNote, setShowAddNote] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    useEffect(() => {
        async function loadNotes() {
            try {
                setshowNotesLoadingError(false);
                setnotesLoading(true);
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                setshowNotesLoadingError(true);
            } finally {
                setnotesLoading(false);
            }
        }
        loadNotes();
    }, []);
    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const notesGrid = (
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
            {notes.map((note) => (
                <Col key={note._id}>
                    <Note
                        note={note}
                        className={styles.note}
                        onDeleteClicked={deleteNote}
                        onNoteClicked={setNoteToEdit}
                    />
                </Col>
            ))}
        </Row>
    );
    return (
        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddNote(true)}
            >
                <FaPlus />
                Note something down..{" "}
            </Button>

            {notesLoading && <Spinner animation="border" variant="primart" />}
            {showNotesLoadingError && (
                <p>Something went wrong. please refresh the page</p>
            )}
            {!notesLoading && !showNotesLoadingError && (
                <>{notes.length > 0 ? notesGrid : <p>You dont have any notes yet</p>}</>
            )}

            {showAddNote && (
                <AddNote
                    onDismiss={() => setShowAddNote(false)}
                    onNoteSaved={(newNote: NoteModel) => {
                        setNotes([...notes, newNote]);
                        setShowAddNote(false);
                    }}
                />
            )}
            {noteToEdit && (
                <AddEditNote
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(
                            notes.map((existingNote) =>
                                existingNote._id === updatedNote._id
                                    ? updatedNote
                                    : existingNote
                            )
                        );
                        setNoteToEdit(null);
                    }}
                />
            )}
        </>
    );
};

export default NotesPageLoggedInView;
