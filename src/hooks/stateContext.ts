import { createContext, useContext } from "react";
import { State } from "../App";

const context =
  createContext<[State, React.Dispatch<React.SetStateAction<State>>] | null>(null);
const { Provider: FormStateProvider } = context;
const useFormState = () => useContext(context);
export { FormStateProvider, useFormState };
