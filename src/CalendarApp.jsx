import { Provider } from "react-redux";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default CalendarApp;
