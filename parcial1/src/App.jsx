import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Details from "./Pages/Details/Details";
import Type from "./Pages/Type/Type";

function App() {
  const url = "http://localhost:3000/dishes";
  const [recipes, setRecipes] = useState([]);

  async function fetchDataAW() {
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json(); // extract JSON from response
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  async function postRecipeAW(recipe) {
    try {
      const response = await fetch(url, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      const newRecipeWithId = await response.json();
      return newRecipeWithId;
    } catch (error) {
      console.log("Error posting data: ", error);
    }
  }

  async function deleteRecipeAW(recipe) {
    try {
      const response = await fetch(url + `/${recipe.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to delete the recipe.");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error deleting data: ", error);
      return false;
    }
  }

  async function updateRecipeAW(recipe) {
    try {
      const response = await fetch(url + `/${recipe.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      const updatedRecipe = response.json();
      return updatedRecipe;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    let recipesPromise = fetchDataAW();

    recipesPromise.then((data) => {
      setRecipes([...data]);
    });
  }, []);

  const addRecipeHandler = async (
    name,
    description,
    type,
    image,
    preparation
  ) => {
    const newRecipe = {
      name: name,
      description: description,
      type: type,
      image: image,
      preparation: preparation,
    };
    const newRecipeWithId = await postRecipeAW(newRecipe);
    setRecipes([...recipes, newRecipeWithId]);
  };

  const deleteRecipeHandler = async (recipe) => {
    // manejo a promesa para poder eliminar de la ui solo si se eliminó de la db
    const wasDeleted = await deleteRecipeAW(recipe);
    if (wasDeleted) {
      setRecipes([
        ...recipes.filter((currentRecipe) => currentRecipe.id !== recipe.id),
      ]);
    } else {
      console.log("No se pudo eliminar en el backend.");
    }
  };

  const updateRecipeHandler = async (recipe) => {
    const updatedRecipe = await updateRecipeAW(recipe);
    if (updatedRecipe != undefined) {
      setRecipes([
        ...recipes.map((currentRecipe) => {
          return currentRecipe.id === recipe.id ? updatedRecipe : currentRecipe;
        }),
      ]);
    }

    // para poder actualizarlo en la pagina desde donde se llama el handler
    return updatedRecipe;
  };

  return (
    <>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/home" />} />
        <Route
          path="/home"
          element={
            <HomePage
              recipes={recipes}
              addRecipeHandler={addRecipeHandler}
              deleteRecipeHandler={deleteRecipeHandler}
            />
          }
        />
        <Route
          path="/details/:recipeId"
          element={<Details updateRecipeHandler={updateRecipeHandler} />}
        />
        <Route
          path="/type/:currentType"
          element={
            <Type
              addRecipeHandler={addRecipeHandler}
              deleteRecipeHandler={deleteRecipeHandler}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
