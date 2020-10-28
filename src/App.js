import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import TareaState from "./context/tareaState";

import Home from "./pages/Home";
import NuevaTarea from "./pages/NuevaTarea";
import EditarTarea from "./pages/EditarTarea";

function App() {
  return (
    <TareaState>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/nueva-tarea" component={NuevaTarea} />
            <Route exact path="/editar-tarea/:id" component={EditarTarea} />
          </Switch>
        </Layout>
      </Router>
    </TareaState>
  );
}

export default App;
