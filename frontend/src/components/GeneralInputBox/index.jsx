const InputBox = (props) => {
    var {name, func, input_type} = props;

    return (
        <div className="columns">
            <div className="column is-2 "></div>
            <div className="column is-2">
                <strong>{name}:</strong>
            </div>
            <div className="column is-block mb-2">
                <input type={input_type} id="propertyName"
                onChange={(e) => func(e.target.value)}
                className="input"
                />
            </div>
            <div className="column is-2"></div>
        </div>
    );
}

export default InputBox;