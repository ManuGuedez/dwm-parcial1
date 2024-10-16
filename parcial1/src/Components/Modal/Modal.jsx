import React, { useRef } from "react";
import classes from "./Modal.module.css";

function Modal({ addRecipe, closeModal }) {
  const name = useRef("");
  const description = useRef("");
  const type = useRef("");
  const image = useRef("");
  const preparation = useRef("");

  const handleButton = () => {
    const newName = name.current.value;
    const newDescription = description.current.value;
    const newType = type.current.value;
    const newImage = image.current.value;
    const newPreparation = preparation.current.value;
    if (
      (newName.trim() == "" && newDescription.trim() == "") ||
      newType.trim() == "" ||
      newImage.trim() == "" || 
      newPreparation.trim() == ""
    ) {
      window.alert("Faltan completar datos!!");
    } else {
      console.log(newName, newDescription, newType, newImage);
      addRecipe(newName, newDescription, newType, newImage, newPreparation);
      closeModal();
    }
  };

  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContent}>
        <p className="title is-4">Nueva card</p>
        <div className={classes.modalContainer}>
          <div className={classes.field}>
            <label className="label">Name</label>
            <div className="control">
              <input
                ref={name}
                className="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div className={classes.field}>
            <label className="label">Description</label>
            <div className="control">
              <input
                ref={description}
                className="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div className={classes.field}>
            <label className="label">Type</label>
            <div className="control">
              <input
                ref={type}
                className="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div className={classes.field}>
            <label className="label">Image</label>
            <div className="control">
              <input
                ref={image}
                className="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div className={classes.field}>
            <label className="label">Preparation</label>
            <div className="control">
              <input
                ref={preparation}
                className="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <button className="button is-danger" id="cancel" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="button is-primary"
            id="accept"
            onClick={handleButton}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
