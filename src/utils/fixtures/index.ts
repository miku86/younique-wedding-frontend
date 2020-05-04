export const mockTodo1 = {
  PK: "USER#b1170078",
  SK: "TODO#b1170078#67219839",
  userId: "b1170078",
  todoId: "67219839",
  title: "Anzug kaufen",
  comment: "rot",
  deadline: "2020-04-03",
  done: false,
  responsible: "Ich",
};

export const mockTodo2 = {
  PK: "USER#b1170078",
  SK: "TODO#b1170078#67219840",
  userId: "b1170078",
  todoId: "67219840",
  title: "Hut kaufen",
  comment: "schwarz",
  deadline: "2020-04-03",
  done: false,
  responsible: "Ich",
};

export const mockGuest1 = {
  PK: "USER#b1170078",
  SK: "GUEST#b1170078#668e6567",
  userId: "b1170078",
  guestId: "668e6567",
  name: "Peter",
  comment: "cool",
  sentSaveTheDate: true,
  sentInvite: true,
  receivedResponse: true,
  coming: true,
};

export const mockGuest2 = {
  PK: "USER#b1170079",
  SK: "GUEST#b1170079#668e6563",
  userId: "b1170079",
  guestId: "668e6563",
  name: "Max",
  comment: "nett",
  sentSaveTheDate: false,
  sentInvite: true,
  receivedResponse: true,
  coming: false,
};

export const mockBudget1 = {
  PK: "USER#b1170079",
  SK: "BUDGETITEM#b1170079#28642819",
  userId: "b1170079",
  budgetItemId: "28642819",
  name: "Schuhe",
  done: false,
  plannedCost: "888",
  actualCost: "777",
};

export const mockBudget2 = {
  PK: "USER#b1170078",
  SK: "BUDGETITEM#b1170078#28642818",
  userId: "b1170078",
  budgetItemId: "28642818",
  name: "Anzug",
  done: true,
  plannedCost: "1000",
  actualCost: "900",
};

export const mockDashboard = {
  todos: { amountItems: 1, amountDoneItems: 0 },
  guests: { amountItems: 2, amountDoneItems: 0 },
  budget: { amountItems: 3, amountDoneItems: 0 }
};