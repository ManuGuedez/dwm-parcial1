import React, {useRef} from "react";
import classes from "./EditModal.module.css";

function EditModal({ recipe, updateRecipeHandler, closeModal }) {
  const name = useRef(recipe.name);
  const description = useRef(recipe.description);
  const type = useRef(recipe.type);
  const image = useRef(recipe.image);
  const preparation = useRef(recipe.preparation);

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
      const newRecipe = {
        id: recipe.id,
        name: newName,
        description: newDescription,
        type: newType, 
        image: newImage, 
        preparation: newPreparation
      };
      updateRecipeHandler(newRecipe);
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
                defaultValue={recipe.name}
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
                defaultValue={recipe.description}
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
                defaultValue={recipe.type}
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
                defaultValue={recipe.image}
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
                defaultValue={recipe.preparation}
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

export default EditModal;
