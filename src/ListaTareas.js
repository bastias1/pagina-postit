import React, { useEffect, useRef, useState } from "react";
import ItemTarea from "./ItemTarea";
import { v4 as uuid } from 'uuid';

function ListaTareas() {
    const [tareas, setTareas] = useState([]);

    const tituloRef = useRef();
    const tareaRef = useRef();
    const importanteRef = useRef();

    const KEY = 'tareas-app-tareas';

    useEffect(()=>{
        const misTareas = JSON.parse(localStorage.getItem(KEY));
        if (misTareas){
            setTareas(misTareas);
        }
    }, []);

    useEffect(()=>{
        const json = JSON.stringify(tareas);
        localStorage.setItem(KEY, json);
    }, [tareas]);

    const agregarTarea = () => {
        const titulo = tituloRef.current.value;
        const tarea = tareaRef.current.value;
        const importante = importanteRef.current.checked;

        if (tarea === '') return;

        setTareas( (prev) => {
            const nuevaTarea = {
                id: uuid(),
                titulo: titulo,
                tarea: tarea,
                importante: importante
            }
            return [...prev, nuevaTarea];
        });

        tituloRef.current.value = '';
        tareaRef.current.value = '';
        importanteRef.current.checked = false;
    }

    return(
        <div className="container-fluid body">
        <h2>Post-It!</h2>
        <div className="row my-4">
            <div className="col-md-3 my-2">
                <input ref={tituloRef} className="form-control" placeholder="Titulo"></input>
            </div>
            <div className="col-md-4 my-2">
                <input ref={tareaRef} className="form-control" placeholder="Ingrese una tarea"></input>
            </div>     
            <div className="form-check col-md-1 my-2 chk">
                <input ref={importanteRef} type="checkbox" className="form-check-input" id="importanteCheck"></input>
                <label className="form-check-label" htmlFor="importanteCheck">Importante</label>
            </div>
            <div className="col-md-2 my-2">
                <button onClick={agregarTarea} className="btn btn-dark ms-2">Agregar</button>
            </div>
        </div>
        <ul className="list-group-horizontal row my-3 notes">
            {tareas.map((t) => (
                <ItemTarea key={t.id} titulo={t.titulo} tarea={t.tarea} importante={t.importante}></ItemTarea>
            ))}
        </ul>
        </div>
    );
}

export default ListaTareas;
