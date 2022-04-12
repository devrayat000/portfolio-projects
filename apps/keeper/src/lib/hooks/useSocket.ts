import { useEffect, useRef, useCallback } from "react";
import io, {
  type ManagerOptions,
  type Socket,
  type SocketOptions,
} from "socket.io-client";

type Props<T extends any[]> = {
  event: string;
  enabled?: boolean;
  listener?: (...data: T) => void;
};

export const createSocketHook = (
  url: string,
  opts: Partial<ManagerOptions & SocketOptions> = {
    rejectUnauthorized: false,
  }
) => {
  return function useSocket<T extends any[]>({
    event,
    enabled = true,
    listener,
  }: Props<T>) {
    const ref = useRef<Socket>();

    const send = useCallback(
      (...args: any[]) => {
        ref.current?.emit(event, args);
      },
      [event, ref]
    );

    useEffect(() => {
      if (!enabled) {
        return;
      }

      const socket = io(url, opts);

      socket.on("connect", () => {
        console.log("Connected");
      });
      socket.on("disconnect", (reason) => {
        console.log("Disconnected", reason);
      });
      socket.on("connect_error", (error) => {
        console.log(error.message);
      });
      socket.emit("join");

      socket.on(event, (...args) => {
        console.log("recieved", args);

        if (listener) {
          listener(...(args as T));
        }
      });

      ref.current = socket;

      return () => {
        socket.disconnect();
      };
    }, [enabled, event, listener]);

    return {
      send,
      socket: ref.current,
    };
  };
};
