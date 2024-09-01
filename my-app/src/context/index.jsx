import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([])

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate('/')
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    console.log(getCurrentItem);
  
    // Create a new array by checking if the item exists
    const cpyFavoritesList = favoritesList.map((item) => item.id === getCurrentItem.id ? null : item).filter(item => item !== null);
  
    // If the item was not found, add it to the list
    const itemExists = favoritesList.some(item => item.id === getCurrentItem.id);
  
    if (!itemExists) {
      cpyFavoritesList.push(getCurrentItem);
    }
  
    setFavoritesList(cpyFavoritesList);
  }
  
  console.log(favoritesList, 'favoritesList');
  

  console.log(favoritesList, 'favoritesList');

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}