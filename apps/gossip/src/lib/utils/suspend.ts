export default function suspend<T>(promise: Promise<T>): { read(): T } {
  let status = "pending";
  let result: T;
  let error: Error;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      error = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result!;
      } else if (status === "success") {
        return result!;
      }
      return result!;
    },
  };
}
