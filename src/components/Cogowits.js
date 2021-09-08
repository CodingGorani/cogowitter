import { useState, useEffect } from 'react';
import { cogowitCollection } from 'fbInstance';
import { onSnapshot } from 'firebase/firestore';
import Cogowit from './Cogowit';
import { Container, FlexBox } from './atoms/Container';

function Cogowits({ userObj }) {
  const [cogowits, setCogowits] = useState([]);

  useEffect(() => {
    const listener = onSnapshot(cogowitCollection, {
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

    return () => {
      listener();
    };
  }, []);

  return (
    <FlexBox wrapper>
      {cogowits.map((cogowit) => {
        return (
          <Cogowit
            key={cogowit.id}
            cogowitObj={cogowit}
            isOwner={cogowit.creatorId === userObj.uid}
            userObj={userObj}
          />
        );
      })}
    </FlexBox>
  );
}

export default Cogowits;
