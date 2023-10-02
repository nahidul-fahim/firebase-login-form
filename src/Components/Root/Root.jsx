import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="container mx-auto p-5">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;