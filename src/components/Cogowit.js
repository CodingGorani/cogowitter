import { useState } from 'react';
import { cogowitCollection, firestorage } from 'fbInstance';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Button } from './atoms/Button';
import { FlexBox, Image } from './atoms/Container';
import CogowitEdit from './CogowitEdit';
import { Span } from './atoms/Typo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import CommentsForm from './CommentsForm';
import Comments from './Comments';
import Like from './Like';

function Cogowit({ userObj, cogowitObj, isOwner }) {
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
      {!isOwner && (
        <Span nameTag align="right">
          by {cogowitObj.creator}
        </Span>
      )}
      {isEdit ? (
        <CogowitEdit cogowitObj={cogowitObj} handleIsEdit={handleIsEdit} />
      ) : (
        <>
          {isOwner && (
            <FlexBox right>
              <Button noShadow small onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button noShadow small onClick={handleIsEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </FlexBox>
          )}
          {cogowitObj.attachmentUrl !== '' && (
            <Image src={cogowitObj.attachmentUrl} />
          )}
          <Span align="left" bold>
            {cogowitObj.text}
          </Span>
        </>
      )}
      {!isEdit && (
        <>
          <Like userObj={userObj} cogowitObj={cogowitObj} />
          <CommentsForm userObj={userObj} cogowitObj={cogowitObj} />
          <Comments cogowitObj={cogowitObj} />
        </>
      )}
    </FlexBox>
  );
}

export default Cogowit;
