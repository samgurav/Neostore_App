import { createStore } from "redux";

import rootReducer from "./reducer/allReducers";

const store =createStore(rootReducer);

export default store;

