import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import {Provider} from "react-redux";
import store from "./src/componants/store";
import Core from "./Core";

function Main(){
    return(
        <Provider store={store}>
        <BrowserRouter>
             <Core></Core>
        </BrowserRouter>
        </Provider>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<Main/>);
