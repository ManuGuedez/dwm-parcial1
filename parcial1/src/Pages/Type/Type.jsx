import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./Type.module.css";
import Modal from "../../Components/Modal/Modal.jsx";
import Card from "../../Components/Card/Card.jsx";

function Type({ addRecipeHandler, deleteRecipeHandler }) {
  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  let { currentType } = useParams();
  const navigate = useNavigate();

  async function fetchDataAW() {
    try {
      const response = await fetch("http://localhost:3000/dishes", {
        method: "GET",
      });
      const data = await response.json(); // extract JSON from response
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    let recipesPromise = fetchDataAW();

    recipesPromise.then((data) => {
      setRecipes(
        [...data].filter((e) => {
          return e.type === currentType;
        })
      );
    });
  }, []);

  const handleGoHomeBtn = () => {
    navigate("/home");
  };

  const habldeDeleteRecipe = async (recipe) => {
    const result = await deleteRecipeHandler(recipe)
    if(result) {
        setRecipes(recipes.filter((cRecipe) => {
            return cRecipe.id !== recipe.id
        }))
    }
  }

  return (
    <div>
      <header>
        <button className="button" onClick={handleGoHomeBtn}>
          go home
        </button>
        <div className={classes.titleContainer}>
          <h1 className="title is-1">{currentType}</h1>
        </div>
      </header>
      <div className={classes.cardsContainer}>
        {recipes.map((currentRecipe, index) => {
          return (
            <Card
              key={index}
              recipe={currentRecipe}
              deleteRecipe={habldeDeleteRecipe}
            />
          );
        })}
      </div>
      {showModal && (
        <Modal
          addRecipe={addRecipeHandler}
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Type;
