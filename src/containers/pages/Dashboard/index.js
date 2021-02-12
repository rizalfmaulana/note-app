import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
  deleteDataAPI,
} from "../../../config/redux/action";
import "./Dashboard.scss";

function Dashboard(props) {
  const [not, setNot] = useState({
    title: "",
    content: "",
    date: "",
    textButton: "SIMPAN",
    noteId: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    props.getNotes(userData.uid);
    console.log("notes", props.notes);
  }, []);

  const handleSaveNotes = () => {
    const { title, content } = not;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };
    if (not.textButton === "SIMPAN") {
      props.saveNotes(data);
      setNot({
        title: "",
        content: "",
        textButton: "SIMPAN",
      });
    } else {
      data.noteId = not.noteId;
      props.updateNotes(data);
      setNot({
        title: "",
        content: "",
        textButton: "SIMPAN",
      });
    }
    console.log(data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNot((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const updateNotes = (note) => {
    setNot({
      title: note.data.title,
      content: note.data.content,
      textButton: "UPDATE",
      noteId: note.id,
    });
  };

  const cancelUpdate = () => {
    setNot({
      title: "",
      content: "",
      textButton: "SIMPAN",
    });
  };

  const deleteNote = (e, note) => {
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    props.deleteNotes(data);
  };

  return (
    <div className="container">
      <div className="input-form">
        <input
          placeholder="Title"
          className="input-title"
          name="title"
          value={not.title}
          onChange={handleChange}
        />
        <textarea
          placeholder="Content"
          name="content"
          className="input-content"
          value={not.content}
          onChange={handleChange}
        ></textarea>
        <div className="action-wrapper">
          {not.textButton === "UPDATE" ? (
            <button className="save-btn cancel" onClick={cancelUpdate}>
              Cancel
            </button>
          ) : (
            <div />
          )}
          <button className="save-btn" onClick={handleSaveNotes}>
            {not.textButton}
          </button>
        </div>
      </div>
      <hr />
      {props.notes.length > 0 ? (
        <>
          {props.notes.map((note) => {
            return (
              <div
                className="card-content"
                key={note.id}
                onClick={() => updateNotes(note)}
              >
                <p className="title">{note.data.title}</p>
                <p className="date">{note.data.date}</p>
                <p className="content">{note.data.content}</p>
                <div
                  className="delete-btn"
                  onClick={(e) => deleteNote(e, note)}
                >
                  x
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    notes: state.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
