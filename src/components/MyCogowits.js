import { useState, useEffect } from 'react';
import { cogowitCollection } from 'fbInstance';
import { where, query, onSnapshot, orderBy } from 'firebase/firestore';
import Cogowit from 'components/Cogowit';
import { FlexBox } from './atoms/Container';
import { H2 } from './atoms/Typo';

function MyCogowits({ userObj }) {
  const [myCogowits, setMyCogowits] = useState([]);

  useEffect(() => {
    const listener = onSnapshot(
      query(
        cogowitCollection,
        where('creatorId', '==', userObj.uid),
        orderBy('createdAt', 'desc')
      ),
      {
        next: (snapshot) => {
          const cogowitArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMyCogowits(cogowitArray);
        },
        error: (error) => {
          console.log(error);
        },
      }
    );
    return () => {
      listener();
    };
  }, []);

  return (
    <FlexBox wrapper>
      <H2>My Cogowits</H2>
      {myCogowits.map((cogowit) => (
        <Cogowit key={cogowit.id} cogowitObj={cogowit} isOwner={true} />
      ))}
    </FlexBox>
  );
}

export default MyCogowits;
