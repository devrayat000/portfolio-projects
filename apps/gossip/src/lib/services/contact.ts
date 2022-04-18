import { contactConverter } from "$lib/models/contact";
import { firestore } from "$lib/modules/firebase";
import suspend from "$lib/utils/suspend";
import { query, collection, where, getDocs } from "firebase/firestore";

export function getContacts() {
  const contactsQuery = query(
    collection(firestore, "contacts").withConverter(contactConverter)
  );
  const contactsPromise = getDocs(contactsQuery).then((snapshot) => {
    return snapshot.docs.map((result) => result.data());
  });

  return suspend(contactsPromise);
}
