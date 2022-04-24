import { ref } from "firebase/database";

import { db } from "$lib/modules/firebase";

export const getDocRef = (docId: string, userId: string) =>
  ref(db, `idocs/${userId}/${docId}`);
