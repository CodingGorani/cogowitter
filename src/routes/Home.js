import React, { useState } from 'react';

import { firestore } from 'fbInstance';
import { addDoc, collection } from 'firebase/firestore';

function Home() {
  const [cogowit, setCogowit] = useState('');

  const handleCogowit = (e) => {
    const { value } = e.target;
    setCogowit(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cogowitCol = collection(firestore, '/cogowit');

    try {
      await addDoc(cogowitCol, {
        cogowit,
        createdAt: new Date(),
      });
      setCogowit('');
    } catch (error) {
      console.log(error);
    }
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
        <input type="submit" value="Cogowit!" />
      </form>
    </div>
  );
}
export default Home;
