import { FC, ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

interface ReduxProvider {
  children: ReactNode;
}

const ReduxProvider: FC<ReduxProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
