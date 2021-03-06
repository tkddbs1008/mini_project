import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import user from "./modules/user";
import post from "./modules/post";

const rootReducer = combineReducers({
  user: user,
  post: post,
});

const middlewares = [thunk];

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
);

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();