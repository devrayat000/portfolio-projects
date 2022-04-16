import { useState } from "react";
import { string } from "yup";

export function useCookie<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState(initialValue);
}
