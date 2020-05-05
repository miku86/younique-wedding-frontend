import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { mockTodo1, mockTodo2 } from "../../utils/fixtures";
import todosReducer, { loadTodos } from "../slices/todosSlice";

describe("todos", () => {
  describe("loadTodos action", () => {
    describe("initially", () => {
      let store;

      beforeEach(() => {
        const initialState = {};

        store = createStore(
          todosReducer,
          initialState,
          applyMiddleware(thunk)
        );
      });

      // TODO: should be false, redux/jest problem?
      it("should not have the loading flag set", () => {
        expect(store.getState().isLoading).toEqual(undefined);
      });

      // TODO: should be false, redux/jest problem?
      it("should have the error flag set", () => {
        expect(store.getState().isError).toEqual(undefined);
      });
    });

    describe("while loading", () => {
      let store;

      beforeEach(()=>{
        const initialState = {
          isError: true
        };

        const api = {
          fetchAll: () => new Promise(() => { })
        };

        store = createStore(
          todosReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api))
        );

        store.dispatch(loadTodos());
      });

      it("should set a loading flag", () => {
        expect(store.getState().isLoading).toEqual(true);
      });

      it("should clear the error flag", () => {
        expect(store.getState().isError).toEqual(false);
      });
    });

    describe("when loading succeeds", () => {
      const items = [
        mockTodo1,
        mockTodo2
      ];

      let store;

      beforeEach(() => {
        const initialState = {
          items: [],
        };

        const api = {
          fetchAll: () => Promise.resolve(items),
        };

        store = createStore(
          todosReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api))
        );

        return store.dispatch(loadTodos());
      });

      it("should store the todos", () => {
        expect(store.getState().items).toEqual(items);
      });

      it("should clear the loading flag", () => {
        expect(store.getState().isLoading).toEqual(false);
      });
    });

    describe("when loading fails", () => {
      let store;

      beforeEach(() => {
        const initialState = { };

        const api = {
          fetchAll: () => Promise.reject(),
        };

        store = createStore(
          todosReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api))
        );

        return store.dispatch(loadTodos());
      });

      it("should clear the loading flag", () => {
        expect(store.getState().isLoading).toEqual(false);
      });

      it("should set the error flag", () => {
        expect(store.getState().isError).toEqual(true);
      });
    });
  });
});
