import React, {useState, useEffect} from 'react';
import {Button, Container, Row, Col, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {Note as NoteModel} from './models/note'
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api"
import AddNote from './components/AddEditNote';
import {FaPlus} from "react-icons/fa"
import AddEditNote from './components/AddEditNote';


function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNote, setShowAddNote] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

  let searchDone = false;
  useEffect(() => {
    async function loadNotes() {
      try {
        if (searchDone === false){
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);}
        
      } catch (error) {
        console.error(error)
        alert(error);
      }
      
    }
    loadNotes();
  }, [])
  

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id)
      setNotes(notes.filter(existingNote => existingNote._id !== note._id))
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    
    <Container>
    <Navbar expand="lg" 
    className={`mb-4 ${styleUtils.blockCenter}`}>
      <Container fluid>
        <Navbar.Brand href="#">NoteNation</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Button 
      className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
      onClick={()=> setShowAddNote(true)}>
        <FaPlus />
         Note something down.. </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
      {notes.map(note => (
        <Col key={note._id}>
        <Note 
        note={note}
        className={styles.note}
        onDeleteClicked= {deleteNote}
        onNoteClicked = {setNoteToEdit}
        />
        </Col>
      ))}
      </Row>
      {showAddNote &&
        <AddNote 
        onDismiss={()=> setShowAddNote(false)}
        onNoteSaved={(newNote: NoteModel)=> {
          setNotes([...notes, newNote])
          setShowAddNote(false)
        }}
        />
      }
      {noteToEdit &&
      <AddEditNote 
      noteToEdit= {noteToEdit}
      onDismiss = { ()=> setNoteToEdit(null)}
      onNoteSaved = {(updatedNote)=>{
        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
        setNoteToEdit(null)
      }}
      />
      }
    </Container>
  );
}

export default App;
