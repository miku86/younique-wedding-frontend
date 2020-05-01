export const STORE_TODOS = "STORE_TODOS";

export const fetchAll = (path: string) => (
  dispatch: any,
  getState: any,
  api: any
) => {
  api.fetchAll(path).then((items: any) => {
    dispatch(storeTodos(items));
  });
};

const storeTodos = (items: any) => ({
  type: STORE_TODOS,
  items,
});
