import React from "react";
import classes from "./Card.module.css";
import { useNavigate } from "react-router-dom";

function Card({ recipe, deleteRecipe }) {
  const navigate = useNavigate();

  const handleDeletBtn = () => {
    deleteRecipe(recipe);
  };

  const handleDetailsBtn = () => {
    navigate(`/details/${recipe.id}`);
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.recipeImage}>{recipe.image}</div>
      <h4 className="title is-4" id={classes.title}>
        {recipe.name}
      </h4>
      <div className={classes.recipeType}>
        <p>
          <b>Comida</b>: {recipe.type}
        </p>
      </div>

      <button className="button" id={classes.button} onClick={handleDetailsBtn}>
        details
      </button>
      <button className="button" id={classes.button} onClick={handleDeletBtn}>
        delete
      </button>
    </div>
  );
}

export default Card;
