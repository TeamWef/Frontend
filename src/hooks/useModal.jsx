import { useState } from "react";

export function useModal() {
  const [Modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!Modal);
  };

  return [Modal, openModal];
}
