import React, { useState } from 'react';
import { cogowitCollection, firestorage } from 'fbInstance';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Button } from './atoms/Button';
import { Container } from './atoms/Container';

function Cogowit({ cogowitObj, isOwner }) {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(cogowitObj.text);

  const handleDeleteClick = async () => {
    const { id, attachmentUrl } = cogowitObj;
    const ok = window.confirm('Are you sure you want to delete this cogowit?');
    if (ok) {
      try {
        await deleteDoc(doc(cogowitCollection, '/', id));
        if (attachmentUrl !== '') {
          await deleteObject(ref(firestorage, attachmentUrl));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleEditClick = async () => {
    try {
      await updateDoc(doc(cogowitCollection, '/', cogowitObj.id), {
        text: editText,
      });
    } catch (error) {
      console.log(error);
    }
    setEditMode(false);
  };

  const handleEditText = (e) => {
    const { value } = e.target;
    setEditText(value);
  };

  return (
    <>
      {cogowitObj.attachmentUrl !== '' && (
        <img src={cogowitObj.attachmentUrl} width="50px" height="50px" />
      )}
      {editMode ? (
        <>
          <form onSubmit={handleEditClick}>
            <input
              type="text"
              value={editText}
              placeholder="Edit your Cogowit"
              onChange={handleEditText}
              maxLength={120}
            />
            <input type="submit" value="Update Cogowit" />
          </form>
          <Button onClick={handleEditToggle}>Cancel</Button>
        </>
      ) : (
        <>
          <h4>{cogowitObj.text}</h4>
          {isOwner && (
            <>
              <Button onClick={handleDeleteClick}>Delete Cogowit</Button>
              <Button onClick={handleEditToggle}>Edit Cogowit</Button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Cogowit;
