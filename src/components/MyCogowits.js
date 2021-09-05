import { useState, useEffect } from 'react';
import { cogowitCollection } from 'fbInstance';
import { where, query, onSnapshot, orderBy } from 'firebase/firestore';
import Cogowit from 'components/Cogowit';

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
    <div>
      {myCogowits.map((cogowit) => (
        <Cogowit key={cogowit.id} cogowitObj={cogowit} isOwner={true} />
      ))}
    </div>
  );
}

export default MyCogowits;
