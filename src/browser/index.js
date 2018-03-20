import App from "../shared/App";
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import {render} from "react-dom";
import configureStore from "../shared/configureStore";

const store = configureStore(window.__initialData__);
delete window.__initialData__;

render(
    <Provider store={store}>
       <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
    );
