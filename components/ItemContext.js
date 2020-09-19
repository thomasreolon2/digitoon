import React from "react";

const ItemContext = React.createContext();

export const ItemProvider = ItemContext.Provider;
export const ItemConsumer = ItemContext.Consumer;

export default ItemContext;
