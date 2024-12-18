"use client";

import "./loader.scss"

interface LoaderProps {
    style?: React.CSSProperties;
}

const Loader = (props: LoaderProps) => {
    return (
        <div className="loaderoutercontainer" style={props.style}>
            <div className="loaderinnercontainer">
                <div className="loader" />
            </div>
        </div>
    )
}

export default Loader;