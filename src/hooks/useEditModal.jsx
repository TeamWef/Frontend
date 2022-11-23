import { useState } from "react";

export function useEditModal() {
  const [EditModal, setEditModal] = useState(false);

  const openEditModal = () => {
    setEditModal(!EditModal);
  };

  return [EditModal, openEditModal];
}
