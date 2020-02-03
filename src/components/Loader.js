import loader from "../assets/images/loader.svg";
import React from "react";

const Loader = () => {
    return (
        <div className="loader-outer">
            <img src={loader} className="loader-custom" alt="loader"/>
        </div>);
}

export default Loader;