import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./Details.module.css";
import EditModal from "../../Components/EditModal/EditModal.jsx";

function Details({ updateRecipeHandler }) {
  let { recipeId } = useParams();
  const navigate = useNavigate();
  const [currentRecipe, setCurrentRecipe] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  async function fetchDataAW() {
    try {
      const response = await fetch(
        "http://localhost:3000/dishes" + `/${recipeId}`,
        { method: "GET" }
      );
      const data = await response.json(); // extract JSON from response
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    let recipesPromise = fetchDataAW();

    recipesPromise.then((data) => {
      setCurrentRecipe(data);
    });
  }, []);

  const handleGoHomeBtn = () => {
    navigate("/home");
  };

  const updateDetails = async (recipe) => {
    const updatedRecipe = await updateRecipeHandler(recipe);

    // solo se vuelve a renderizar si se obtiene respuesta del back
    if (updatedRecipe !== undefined) {
      setCurrentRecipe(updatedRecipe);
    }
  };

  return (
    <div className={classes.detailsPageContainer}>
      <div className={classes.detailsContent}>
        <button id={classes.goHomeButton} onClick={handleGoHomeBtn}>
          {"<"} go home
        </button>
        <h1 className="title is-1" id={classes.title}>
          {currentRecipe.name} {currentRecipe.image}
        </h1>
        <div className={classes.editButtonContainer}>
          <button className="button" onClick={() => setShowEditModal(true)}>
            Edit
          </button>
        </div>
        <div className={classes.dataContainer}>
          <p>
            <strong>Description: </strong>
            {currentRecipe.description}
          </p>
          <p>
            <strong>Type: </strong>
            {currentRecipe.type}
          </p>
          <p>
            <strong>Preparation: </strong>
            {currentRecipe.preparation}
          </p>
        </div>
      </div>
      {showEditModal && (
        <EditModal
          recipe={currentRecipe}
          updateRecipeHandler={updateDetails}
          closeModal={() => {
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Details;
