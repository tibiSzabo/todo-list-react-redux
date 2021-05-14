export const todoWithNameExists = (name, todoList) => todoList.find(todo => todo.name === name.trim());

export const todoNameInvalid = name => name.trim().length < 3;