const reducer = (state, action) => {
  if (action.type === "SHOWPRODUCT") {
    return {
      ...state,
      id: action.id,
      description: action.description,
      price: action.price,
      images: action.images,
      title: action.title,
      category: action.category,
      brand: action.brand,
    };
  }
  if (action.type === "GOBACK") {
    return {
      ...state,
      id: "",
      description: "",
      price: "",
      images: "",
      title: "",
      category: "",
      brand: "",
    };
  }

  throw new Error("No Matching action");
};

export default reducer;
