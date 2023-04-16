const Note = ({ note }) => {
  console.log(note);
  return <div>{note.note === "rest" ? "rest" : note.fret}</div>;
};

export default Note;
