import { createSlice } from "@reduxjs/toolkit";

interface TodoType {
  id: number;
  name: string;
  image: string;
  price: number;
}

const initialState: { data: TodoType[] } = {
  data: [],
};

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newData = {
        id: Date.now(),
        name: action.payload.name,
        image: action.payload.image,
        price: action.payload.price,
      };
      state.data.push(newData);
    },
    deleteTodo: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    upDateTodo: (state, action) => {
      const { id, name, image, price } = action.payload;
      // eslint-disable-next-line prefer-const
      let upNewData = state.data.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            name,
            image,
            price,
          };
        }
        return todo;
      });

      state.data = upNewData;
    },
    deleteAll: (state) => {
      state.data = [];
    },
  },
});

export const { addTodo, deleteTodo, upDateTodo, deleteAll } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
