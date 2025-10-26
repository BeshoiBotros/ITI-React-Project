import { zodResolver } from "@hookform/resolvers/zod";
import { type Note, noteSchema } from "../types";
import { useForm } from "react-hook-form";
import { type NoteFormData } from "../types";
import { useState } from "react";
import Card from "../components/Statistics/Card";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });

  const noteFormSubmit = (data: NoteFormData) => {
    setNotes((prev) => {
      return [...prev, data];
    });
    console.log(notes);
  };

  const deleteNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePriority = (
    index: number,
    newPriority: "important" | "normal" | "delayed"
  ) => {
    setNotes((prev) =>
      prev.map((note, i) =>
        i === index ? { ...note, priority: newPriority } : note
      )
    );
  };

  return (
    <div className="m-5 flex flex-col w-[98%] justify-center items-center m-auto my-5 ms-3">
      <h1 className="text-3xl font-bold m-5 self-start">Notes</h1>
      <div className="w-[90%]">
        <div className="flex gap-10">
          <Card
            title="Notes"
            statistic={notes.length}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-notebook-pen-icon lucide-notebook-pen"
              >
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                <path d="M2 6h4" />
                <path d="M2 10h4" />
                <path d="M2 14h4" />
                <path d="M2 18h4" />
                <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
              </svg>
            }
          />
        </div>
        <div className="card card-border bg-base-100 w-full border border-gray-200 shadow-md rounded rounded-3xl min-w-50">
          <div className="card-body">
            <h2 className="card-title">Add New Note</h2>
            <form
              action=""
              className="w-full"
              onSubmit={handleSubmit(noteFormSubmit)}
            >
              <label className="input w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  {...register("title")}
                  type="search"
                  className="grow w-full"
                  placeholder="Type Your Note Here"
                />
              </label>
              {errors.title && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.title.message}
                </p>
              )}
              <label className="select mt-3">
                <select id="" {...register("priority")}>
                  <option value="">---</option>
                  <option value="important">important</option>
                  <option value="normal">normal</option>
                  <option value="delayed">delayed</option>
                </select>
              </label>
              {errors.priority && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.priority.message}
                </p>
              )}
              <div className="card-actions justify-start mt-3">
                <button className="btn btn-primary">+ Add Note</button>
              </div>
            </form>
          </div>
        </div>

        <div className="card card-border bg-base-100 w-full border border-gray-200 shadow-md rounded rounded-3xl mt-10 min-w-50">
          <div className="card-body">
            <h2 className="card-title">My notes</h2>
            {notes && notes.length > 0 ? (
              <table className="table mb-50">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Edit Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {notes?.map((note, index) => (
                    <tr key={index}>
                      <th></th>
                      <td>{note.title}</td>
                      <td>{note.priority}</td>
                      <th>
                        <div className="dropdown">
                          <div tabIndex={0} role="button" className="btn m-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </div>
                          <ul
                            //   tabIndex="-1"
                            className="dropdown-content menu bg-base-100 rounded-box z-1 w-60 p-2 shadow-sm"
                          >
                            <li>
                              <label className="select w-full">
                                <select
                                  value={note.priority}
                                  onChange={(e) =>
                                    updatePriority(
                                      index,
                                      e.target.value as
                                        | "important"
                                        | "normal"
                                        | "delayed"
                                    )
                                  }
                                >
                                  <option value="important">Important</option>
                                  <option value="normal">Normal</option>
                                  <option value="delayed">Delayed</option>
                                </select>
                              </label>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="btn btn-error my-2"
                                onClick={() => deleteNote(index)}
                              >
                                Delete Note
                              </button>
                            </li>
                          </ul>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
              </table>
            ) : (
              <p className="justify-center self-center">No Notes Yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notes;
