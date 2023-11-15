import "./Loader.scss"

interface LoaderProps {
    style?: React.CSSProperties;
}

const Loader = (props: LoaderProps) => {
    return (
        <div className="loader-container" style={props.style}>
            <div className="loader" />
        </div>
    )
}

export default Loader;