import React, { useEffect, useState, useRef } from 'react';

import Cogowits from 'components/Cogowits';
import CogowitForm from 'components/CogowitForm';

function Home({ userObj }) {
  return (
    <>
      <CogowitForm userObj={userObj} />
      <Cogowits userObj={userObj} />
    </>
  );
}
export default Home;
