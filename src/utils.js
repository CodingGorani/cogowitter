import { firestore } from 'fbInstance';
import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';

export default async function addUserInfo(data) {
  const { displayName, uid, photoURL } = data.user;

  const uidCheck = await getDocs(
    query(collection(firestore, '/user'), where('uid', '==', uid))
  );
  const uidCheckArr = uidCheck.docs.map((doc) => doc.data());

  if (uidCheckArr.length === 0) {
    console.log('진입성공');
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
}
