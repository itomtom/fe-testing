/**
 * @jest-environment jsdom
 */

import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

import { render, screen } from "@testing-library/react";
import { Counter } from "./Counter";
import { CounterState } from "./counterSlice";
import counterReducer from "./counterSlice";
import { configureStore } from "@reduxjs/toolkit";

const initialState: CounterState = {
  value: 3,
  status: "idle",
};

const getStore = (state = initialState) =>
  configureStore({
    preloadedState: {
      counter: state,
    },
    reducer: {
      counter: counterReducer,
    },
  });

const renderer = (store = getStore()) => {
  render(
    <Provider store={store}>
      <div data-testid="component-root">
        <Counter />
      </div>
    </Provider>
  );
};

describe("Counter", () => {
  it("should show join button", () => {
    const store = getStore(initialState);
    renderer(store);
    expect(screen.getByTestId("component-root")).toMatchSnapshot();
  });
});
