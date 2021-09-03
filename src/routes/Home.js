import React, { useEffect, useState, useRef } from 'react';

import { cogowitCollection, firestorage } from 'fbInstance';
import { addDoc, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Cogowit from 'components/Cogowit';

function Home({ userObj }) {
  const [cogowit, setCogowit] = useState('');
  const [cogowits, setCogowits] = useState([]);
  const [attachment, setAttachment] = useState();
  const fileInput = useRef();

  useEffect(() => {
    onSnapshot(cogowitCollection, {
      next: (snapshot) => {
        const cogowitArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCogowits(cogowitArray);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  const handleCogowit = (e) => {
    const { value } = e.target;
    setCogowit(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let attachmentUrl = '';
      if (attachment !== null) {
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
        attachmentUrl,
      };

      await addDoc(cogowitCollection, cogowitData);

      setCogowit('');
      setAttachment(null);
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's On Your Mind?"
          maxLength={120}
          value={cogowit}
          onChange={handleCogowit}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Cogowit!" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={handleClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {cogowits.map((cogowit) => {
          return (
            <Cogowit
              key={cogowit.id}
              cogowitObj={cogowit}
              isOwner={cogowit.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Home;
