import React, { createContext, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Item {
  id: string;
  value: string;
}

interface AppContextType {
  stringList: Item[];
  stringsSelected: string[];
  newString: string;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  setNewString: (val: string) => void;
  handleClickItem: (item: Item) => void;
  handleOpenModal: () => void;
  handleBackString: () => void;
  handleAddString: () => void;
  handleDeleteString: () => void;
  handleDeleteStringDoubleClick: (id: string) => void;
}

export const AppContext = createContext<AppContextType>(
  {} as AppContextType
);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stringList, setStringList] = useState<Item[]>([
    { id: "1", value: "Texto de ejemplo 1" },
    { id: "2", value: "Texto de ejemplo 2" }
  ]);
  const [stringListCopy, setStringListCopy] = useState<Item[]>(stringList);
  const [stringsSelected, setStringsSelected] = useState<string[]>([]);
  const [newString, setNewString] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClickItem = (item: Item) => {
    setStringsSelected((prev) => [...prev, item.id]);
  };

  const handleOpenModal = () => {
    dialogRef.current?.showModal();
  };

  const handleBackString = () => {
    setStringList(stringListCopy);
    setStringsSelected([]);
  };

  const handleAddString = () => {
    const newItem = { id: uuidv4(), value: newString.trim() };
    setStringList((prev) => [...prev, newItem]);
    setNewString("");
    setStringListCopy(stringList)
    dialogRef.current?.close();
  };

  const handleDeleteString = () => {
    setStringListCopy(stringList);
    setStringList((prev) => prev.filter(item => !stringsSelected.includes(item.id)));
  };

  const handleDeleteStringDoubleClick = (id: string) => {
    setStringListCopy(stringList);
    setStringList((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        stringList,
        stringsSelected,
        newString,
        dialogRef,
        setNewString,
        handleClickItem,
        handleOpenModal,
        handleBackString,
        handleAddString,
        handleDeleteString,
        handleDeleteStringDoubleClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
