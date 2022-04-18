import { FirestoreDataConverter } from "firebase/firestore";

export default class Contact {
  name!: string;

  constructor(props: Contact) {
    Object.assign(this, props);
  }
}

export const contactConverter: FirestoreDataConverter<Contact> = {
  toFirestore: (contact) => {
    return {
      name: contact.name,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Contact({ ...(data as any) });
  },
};
