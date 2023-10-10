import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";

type Todo = {
  id: number;
  name: string;
  done: boolean;
};

type TodoState = {
  list: Todo[];
  user: string;
  text: string;
};

const initialState: TodoState = {
  list: [],
  user: "todo",
  text: '',
};

export const testThunk = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'app/testThunk',
  async (token, { rejectWithValue }) => {
    try {
      const result = await fetch('/api/test');
      const resJson = await result.json()
      return resJson.test
    } catch (e: unknown) {
      return rejectWithValue(`Ошибка test ${(e as Error).toString()}`);
    }
  }
);

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state: TodoState, action) => {
      state.list.push(action.payload);
    },
    removeTodo: (state: TodoState, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state: TodoState, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(testThunk.fulfilled, (state: TodoState, action) => {
        console.log('fulfilled', action.payload)
        state.text = action.payload;
      })
      .addMatcher(isAnyOf(testThunk.pending), (state: TodoState) => {
        console.log(state.text, 'loading')
      })
      .addMatcher(isAnyOf(testThunk.rejected), (state: TodoState) => {
        console.log(state.text, 'error')
      });
  },
});

export const todoActions = todo.actions;
export default todo.reducer;
