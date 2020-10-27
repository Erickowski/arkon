import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import NuevaTarea from "./pages/NuevaTarea";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/nueva-tarea" component={NuevaTarea} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
