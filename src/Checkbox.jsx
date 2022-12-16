import React from "react"

function Checkbox(props) {
    return (
        <div className="checkbox-wrapper">
            <label>
                <input className={props.isChecked ? "checked" : ""} type="checkbox" checked={props.isChecked} onChange={props.toggle} name={props.name}/>
                <span>{props.label}</span>
            </label>
        </div>
    )
}

export default Checkbox