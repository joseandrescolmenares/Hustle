"use client"
import React from "react";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";

const AddNotes = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Cargar notas desde el localStorage al montar el componente
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const addNote = () => {
    if (inputValue.trim() !== "") {
      const newNotes = [...notes, inputValue];
      setNotes(newNotes);
      localStorage.setItem("notes", JSON.stringify(newNotes));
      setInputValue("");
    }
  };
  return (
    <div className=" shadow-md border-slate-200 p-4 rounded-md  w-full  flex flex-col gap-4 mb-6">
      <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Workspace
      </h2>
      <div>
        <div className="flex gap-3">
          <Input
            placeholder="Añadir notas de progreso"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button onClick={addNote}>Add</Button>
        </div>
        <div className=" h-64 overflow-x-scroll  flex flex-col gap-4 mt-5">
          {notes.map((note, index) => (
            <p className="p-4 shadow-md border-slate-200" key={index}>
              {note}
            </p>
          ))}

          {/* <div className=" h-64 overflow-x-scroll  flex flex-col gap-4 mt-5">
            {allNotesData
              ? allNotesData.map((note: NoteData) => (
                  <p className="p-4 shadow-md border-slate-200" key={note.id}>
                    {extractTextFromHTML(note.properties.hs_note_body)}
                  </p>
                ))
              : null}
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default AddNotes;
