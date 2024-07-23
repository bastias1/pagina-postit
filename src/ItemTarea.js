import React from "react";

function ItemTarea(props) {
    return(
        <li className={`col-md-3 me-4 rotate-1 post-it ${props.importante ? 'importante' : ''}`}>
            <h2>{props.titulo}</h2>
            <p>{props.tarea}</p>
        </li>
    );
}

export default ItemTarea;
