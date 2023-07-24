import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note"
import { assertisDefined } from "../util/assertisDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserid = req.session.userId    

    try {
        assertisDefined(authenticatedUserid);
        const notes = await NoteModel.find({userId: authenticatedUserid}).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

export const getNote: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserid = req.session.userId 
    try {
        assertisDefined(authenticatedUserid);
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note ID")
        }
        const note = await NoteModel.findById(noteId).exec();

        if (!note){
            throw createHttpError(404, "note not found")
        }

        if(!note.userId.equals(authenticatedUserid)){
            throw createHttpError(404, "You cant access this not bro")
        }

        res.status(200).json(note)
    } catch (error) {
        next(error);
    }
} 


interface CreateNoteBody {
    title?:string,
    text?:string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res , next) => {
    const authenticatedUserid = req.session.userId 
    const title = req.body.title;
    const text = req.body.text;
    try {
        assertisDefined(authenticatedUserid);
        if(!title){
            throw createHttpError(400, "Note must have a title");
        }
        const newNote = await NoteModel.create({
            userId: authenticatedUserid,
            title: title,
            text: text,
        })

        res.status(201).json(newNote)
    } catch (error) {
        next(error);
    }
}

interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next)=> {
    const authenticatedUserid = req.session.userId 
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        assertisDefined(authenticatedUserid);
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note id")
        }
        if(!newTitle){
            throw createHttpError(400, "Note must have a title")
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note){
            throw createHttpError(404, "note not found")
        }
        if(!note.userId.equals(authenticatedUserid)){
            throw createHttpError(404, "You cant access this not bro")
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save()

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserid = req.session.userId 
  
    try {
        assertisDefined(authenticatedUserid);
        if (!mongoose.isValidObjectId(noteId)) {
        throw createHttpError(400, "Invalid note id");
      }
  
      const note = await NoteModel.findByIdAndDelete(noteId).exec();
  
      if (!note) {
        throw createHttpError(404, "Note not found");
      }
      
      if(!note.userId.equals(authenticatedUserid)){
        throw createHttpError(404, "You cant access this not bro")
    }
  
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
