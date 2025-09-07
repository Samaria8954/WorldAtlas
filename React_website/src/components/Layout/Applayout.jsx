import { Outlet } from "react-router-dom";
import { Footers } from "../UI/Footers";
import { Headers } from "../UI/Headers";

export const Applayout = () => {
    return (
        <>
            <Headers />
            <Outlet />
            <Footers />

        </>
    );
}