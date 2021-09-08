import React, { useReducer, useState } from 'react';
import { cogowitCollection, firestorage } from 'fbInstance';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Button } from './atoms/Button';
import { FlexBox } from './atoms/Container';
import CogowitEdit from './CogowitEdit';
import { Span } from './atoms/Typo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Cogowit({ cogowitObj, isOwner, userObj }) {
  const [isEdit, setIsEdit] = useState(false);

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

  const handleIsEdit = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <FlexBox middle direction="column">
      {cogowitObj.attachmentUrl !== '' && (
        <img src={cogowitObj.attachmentUrl} width="50px" height="50px" />
      )}
      {isEdit ? (
        <CogowitEdit cogowitObj={cogowitObj} handleIsEdit={handleIsEdit} />
      ) : (
        <>
          {isOwner ? (
            <FlexBox right>
              <Button onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button onClick={handleIsEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </FlexBox>
          ) : (
            <Span align="right">by {userObj.displayName}</Span>
          )}
          <Span align="left" bold>
            {cogowitObj.text}
          </Span>
        </>
      )}
    </FlexBox>
  );
}

export default Cogowit;
