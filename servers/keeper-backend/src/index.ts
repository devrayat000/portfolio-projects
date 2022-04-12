import { Server, Socket } from "socket.io";
import { pubsub } from "./pubsub";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    var io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", async (socket) => {
      console.log(`a user connected`);

      socket.emit("hello", "connected");

      socket.on("join", () => {
        console.log("joined");
        socket.join("user1");

        pubsub.on("todo_created", (todo) => {
          console.log("created");

          socket.to("user1").emit("todo_created", todo);
        });
      });

      socket.on("disconnect", () => {
        console.log("a user disconnected");
      });
    });
    strapi.io = io; // register socket io inside strapi main object to use it globally anywhere
  },
};
