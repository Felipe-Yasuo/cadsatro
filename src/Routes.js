import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Principal from "./pages/Principal";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/cadastro" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/principal" component={Principal} />
                <Redirect from="/" to="/login" />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
