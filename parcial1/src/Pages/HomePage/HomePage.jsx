import React, { useState, useEffect } from "react";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";

function HomePage({ recipes, addRecipeHandler, deleteRecipeHandler }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentType, setCurrentType] = useState("none");
  let types = ["none"];

  recipes.map((element) => {
    if (
      types.find((e) => e === element.type) === null ||
      types.find((e) => e === element.type) === undefined
    ) {
      console.log("entro");
      types = [...types, element.type];
    }
  });

  useEffect(() => {
    if (currentType != "none") {
      navigate(`/type/${currentType}`);
    }
  }, [currentType]);

  const handleCategoryChange = (event) => {
    setCurrentType(event.target.value);
  };

  return (
    <div>
      <header>
        <div className={classes.titleContainer}>
          <p className="title is-2">Recetas</p>
        </div>
        <div className={classes.buttonContainer}>
          <div>
            <div className="select is-fullwidth">
              <select name="category" onChange={handleCategoryChange}>
                {types.map((e, index) => {
                  return (
                    <option key={index} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            className={`button`}
            id={classes.button}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add recipe
          </button>
        </div>
      </header>
      <div className={classes.cardsContainer}>
        {recipes.map((currentRecipe, index) => {
          return (
            <Card
              key={index}
              recipe={currentRecipe}
              deleteRecipe={deleteRecipeHandler}
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

export default HomePage;
