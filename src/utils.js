import { firestore } from 'fbInstance';
import { addDoc, collection } from '@firebase/firestore';

export default async function addUserInfo(data) {
  const { displayName, uid, photoURL } = data.user;
  try {
    await addDoc(collection(firestore, '/user'), {
      displayName,
      uid,
      photoURL,
    });
  } catch (error) {
    console.log(error);
  }
}
