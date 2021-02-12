import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import Register from "../Register";
import Login from "../Login";
import { store } from "../../../config/redux";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
