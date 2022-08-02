import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSice";

export const startNewNote = () => {
    return async( dispatch, getState) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth; // para guardar en firestore necesito el uid del usuario

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote);

        newNote.id = newDoc.id;
        
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote)  );

    }
}

export const startLoadingNotes = ( uid='' ) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth; // para consultar de firestore necesito el uid del usuario
        if (!uid) throw new Error('ElUDI del usuario no existe');

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );

        const { uid } = getState().auth; // para modificar en firestore necesito el uid del usuario
        const { active:note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}` );
        await setDoc(docRef, noteToFirestore, { merge: true }); //si hay campos nuevos se mantienen los campos anteriores

        dispatch( updateNote( note ) );
    }

}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch, getState) => {
        dispatch( setSaving() );
        
        // await fileUpload( files[0] );
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote(photosUrls) );
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        const resp = await deleteDoc(docRef);

        dispatch( deleteNoteById(note.id) );
    }
}