import React, { useState } from 'react';
import { Button } from './atoms/Button';
import { cogowitCollection, firestorage } from 'fbInstance';
import { doc, updateDoc } from 'firebase/firestore';
import { Input } from './atoms/Input';

function CogowitEdit({ cogowitObj, handleIsEdit }) {
  const [editText, setEditText] = useState(cogowitObj.text);

  const handleEditClick = async () => {
    try {
      await updateDoc(doc(cogowitCollection, '/', cogowitObj.id), {
        text: editText,
      });
    } catch (error) {
      console.log(error);
    }
    handleIsEdit();
  };

  const handleEditText = (e) => {
    const { value } = e.target;
    setEditText(value);
  };

  return (
    <>
      <form onSubmit={handleEditClick}>
        <Input
          type="text"
          value={editText}
          placeholder="Edit your Cogowit"
          onChange={handleEditText}
          maxLength={120}
        />
        <Input type="submit" value="Update Cogowit" />
      </form>
      <Button onClick={handleIsEdit}>Cancel</Button>
    </>
  );
}

export default CogowitEdit;
