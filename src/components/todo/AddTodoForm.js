import React, { useRef } from "react";

const AddTodoForm = (props) => {

    const textInputRef = useRef(null);

    const handleFormSubmit = () => {
        console.log(textInputRef.current.value)
    }

    return (
        <div className="form">
            <input type="text" ref={textInputRef} />
            <button onClick={handleFormSubmit}>Add</button>
        </div>
    )
}

export default AddTodoForm;