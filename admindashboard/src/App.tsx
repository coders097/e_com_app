import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router";
import ItemView from "./components/ItemView";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PNF from "./pages/PNF";

// Reducer Parts
import _authState from "./state/authState";
import _authReducer from "./reducer/authReducer";

import _itemsState from "./state/itemsState";
import _itemsReducer from "./reducer/itemsReducer";

const App = () => {
  // Reducers
  let [authState, authDispatch] = useReducer(_authReducer, _authState);
  let [items, setItems] = useReducer(_itemsReducer, _itemsState);

  return (
    <Routes>
      {authState.loggedIn ? (
        <>
          <Route
            path="/"
            element={
              <Dashboard authState={authState} authDispatch={authDispatch} items={items} setItems={setItems} />
            }
          />
          <Route element={<PNF />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={<Auth authState={authState} authDispatch={authDispatch} />}
          />
          <Route element={<PNF />} />
        </>
      )}
    </Routes>
  );
};

export default App;
