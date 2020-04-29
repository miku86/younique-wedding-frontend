import { Order } from "./customTypes";

export function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const hasNumber = (myString: any) => /\d/.test(myString);
const isString = (value: any) => typeof value === "string";

function desc<T>(a: T, b: T, orderBy: keyof T) {
  /*
    we want to sort ignoring lowercase or uppercase
    therefore if the value is a string and has no numbers in it,
    we make it lowercase, else we do nothing
  */
  let lowercaseA = a[orderBy];
  let lowercaseB = b[orderBy];

  if (
    isString(a[orderBy]) &&
    !hasNumber(a[orderBy]) &&
    isString(b[orderBy]) &&
    !hasNumber(b[orderBy])
  ) {
    lowercaseA = (a[orderBy] as any).toLowerCase();
    lowercaseB = (b[orderBy] as any).toLowerCase();
  }

  if (lowercaseB < lowercaseA) {
    return -1;
  }
  if (lowercaseB > lowercaseA) {
    return 1;
  }
  return 0;
}

export function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (a: { [key in K]: any }, b: { [key in K]: any }) => number {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export const getRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomDate = () => {
  const year = getRandomNumberBetween(2000, 2030);
  const month = String(getRandomNumberBetween(1, 12)).padStart(2, "0");
  const day = getRandomNumberBetween(1, 28);
  return `${year}-${month}-${day}`;
};
