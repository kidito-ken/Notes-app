import { Modal , Form, Button} from "react-bootstrap";
import React from "react";
import {Note} from "../models/note"
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api"
import "../styles/AddEditNote.css";
import TextInputField from "./form/TextInputField";

// interface AddEditNoteProps{
//     noteToEdit?: Note,
//     onDismiss: () => void,
//     onNoteSaved: (note: Note) => void,
// }

// const AddEditNote = ({noteToEdit, onDismiss, onNoteSaved}: AddEditNoteProps) => {

//     const { register, handleSubmit, formState:{errors, isSubmitting}} = useForm<NoteInput>({
//         defaultValues: {
//             title: noteToEdit?.title || "",
//             text: noteToEdit?.text || "",
//         }
//     })

//     async function onSubmit(input: NoteInput) {
//         try {
//             let noteResponse: Note;
//             if(noteToEdit){
//                 noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
//             }else{
//                 noteResponse = await NotesApi.createNote(input);
//             }
//             onNoteSaved(noteResponse);
//         } catch (error) {
//             console.error(error)
//             alert(error)
//         }
//     }

//     return (  
//         <Modal show onHide={onDismiss}>
//             <Modal.Header closeButton>
//                 <Modal.Title>
//                     {noteToEdit ? "Edit Note" : "Add Note"}
//                 </Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//                 <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Title</Form.Label>
//                         <Form.Control 
//                         type="text"
//                         placeholder = "Title"
//                         isInvalid={!!errors.title}
//                         {...register("title", {required:"Required"})}
//                         />
// <Form.Control.Feedback type="invalid">
//     {
//         errors.title && errors.title.message
//         ? errors.title.message
//         : "No errors"
//     }
// </Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Text</Form.Label>
//                         <Form.Control 
//                         as="textarea"
//                         rows={5}
//                         placeholder="Text"
//                         {...register("text")}
//                         />
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button type="submit"
//                 form="addEditNoteForm"
//                 disabled={isSubmitting}>
//                     Save
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }
 
// export default AddEditNote;

interface AddEditNoteProps {
    noteToEdit?: Note;
    onDismiss: () => void;
    onNoteSaved: (note: Note) => void;
  }
  
  const AddEditNote = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
      defaultValues: {
        title: noteToEdit?.title || "",
        text: noteToEdit?.text || "",
      },
    });
  
    async function onSubmit(input: NoteInput) {
      try {
        let noteResponse: Note;
        if (noteToEdit) {
          noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
        } else {
          noteResponse = await NotesApi.createNote(input);
        }
        onNoteSaved(noteResponse);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  
    return (
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton
        className="add-edit-note-form">
          <Modal.Title >{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
        </Modal.Header>
  
        <Modal.Body >
          <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)} className="add-edit-note-form">
            <TextInputField 
              name= "title"
              label="Title"
              type="text"
              placeholder = "Title"
              register={register}
              registerOptions={{required:"Required"}}
              error={errors.title}
            />
            <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows= {5}
            placeholder = "Text"
            register={register}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default AddEditNote;