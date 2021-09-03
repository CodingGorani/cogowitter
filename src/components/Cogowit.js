import React, { useState } from 'react';
import { cogowitCollection, firestore } from 'fbInstance';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

function Cogowit({ cogowitObj, isOwner }) {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(cogowitObj.text);

  const handleDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this cogowit?');
    if (ok) {
      try {
        await deleteDoc(doc(cogowitCollection, '/', cogowitObj.id));
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
    <div>
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
          <button onClick={handleEditToggle}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{cogowitObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={handleDeleteClick}>Delete Cogowit</button>
              <button onClick={handleEditToggle}>Edit Cogowit</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Cogowit;
