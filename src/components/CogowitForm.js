import React, { useState, useRef } from 'react';
import { cogowitCollection, firestorage } from 'fbInstance';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Input } from './atoms/Input';
import { Button } from './atoms/Button';
import { FlexBox } from './atoms/Container';

function CogowitForm({ userObj }) {
  const [cogowit, setCogowit] = useState('');
  const [attachment, setAttachment] = useState('');
  const fileInput = useRef();

  const handleCogowit = (e) => {
    const { value } = e.target;
    setCogowit(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let attachmentUrl = '';
      if (attachment !== '') {
        const attachmentRef = ref(firestorage, `${userObj.uid}/${uuidv4()}`);
        const uploadResult = await uploadString(
          attachmentRef,
          attachment,
          'data_url'
        );
        attachmentUrl = await getDownloadURL(uploadResult.ref);
      }

      const cogowitData = {
        text: cogowit,
        createdAt: new Date(),
        creatorId: userObj.uid,
        creator: userObj.displayName,
        attachmentUrl,
      };

      await addDoc(cogowitCollection, cogowitData);

      setCogowit('');
      setAttachment('');
      fileInput.current.value = null;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      setAttachment(finishedEvent.currentTarget.result);
    };
    if (files) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = null;
  };

  return (
    <FlexBox wrapper>
      <FlexBox middle direction="column" as="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="What's On Your Mind?"
          maxLength={120}
          value={cogowit}
          onChange={handleCogowit}
        />
        <Button
          noShadow
          as="input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInput}
        />
        <Button as="input" type="submit" value="Cogowit!" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <Button onClick={handleClearAttachment}>Clear</Button>
          </div>
        )}
      </FlexBox>
    </FlexBox>
  );
}

export default CogowitForm;
