import { pubsub } from "../../../../pubsub";

export default {
  afterCreate(event) {
    const { result, params } = event;
    console.log("created");

    pubsub.emit("todo_created", result);
    // do something to the result;
  },
};
