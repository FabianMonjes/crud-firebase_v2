import { useEffect, useState } from "react";
import {firebase} from './firebase'

function App() {



  const [tareas,setTareas] = useState([])
  const [tarea,setTarea] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setID] = useState('')

  //al iniciar
  useEffect(()=>{

    const obtenerDatos = async () => {

      try {
        
        const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        const arrayData =  data.docs.map( doc => ({
          id : doc.id, ...doc.data()
        }) )
        //console.log(arrayData)
        setTareas(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  },[])

  //agregar tarea
  const agregar = async (e) =>{
    e.preventDefault()
    // console.log(tarea)
    if(!tarea.trim()){
      // console.log(tarea)
      return 
    }
    try {
      
      const db = firebase.firestore()
      const nuevaTarea = {
        
        name : tarea,
        fecha : Date.now()

      }
      const data = await db.collection('tareas').add(nuevaTarea)
      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])
      setTarea('')
    } catch (error) {
      console.log(error)
    }
  }
  //eliminar
  const eliminar = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id!==id)
      setTareas(arrayFiltrado)

    } catch (error) {
      console.log(error)
    }
  }

  //activar modo edicion
  const activarEdicion = (item) =>{
    setModoEdicion(true)
    setTarea(item.name)
    setID(item.id)
  }
  //editar funcion
  const editar = async (e) =>{
      e.preventDefault()
      if(!tarea.trim()){
        // console.log(tarea)
        return 
      }
      try {
        
        const db = firebase.firestore()
        await db.collection('tareas').doc(id).update({
          name:tarea
        })

        //creamos un array editado
        const arrayEditado = tareas.map(item => (
          item.id === id ? {id: item.id, fecha: item.fecha, name : tarea} : item
        ))

        setTareas(arrayEditado)
        setModoEdicion(false)
        setTarea('')
        setID('')

      } catch (error) {
        console.log(error)
      }
  }


  return (
    <div className="container mt-3">
      <h1>Holi</h1>
      <hr/>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map( item =>(
                <li key={item.id}  className="list-group-item">
                  {item.name}
                  <button onClick ={() => activarEdicion(item)} className="btn btn-warning btn-sm float-right mr-2">Editar</button>
                  <button onClick={() => eliminar(item.id)} className="btn btn-danger btn-sm float-right">Eliminar</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3> 
            {
              modoEdicion ? 'Editar Tarea' : 'Formulario'
            } 
          </h3>
          <form onSubmit={modoEdicion ? editar : agregar}>
            <input onChange={e => setTarea(e.target.value)} value={tarea} type="text" className="form-control" placeholder="Tarea" name="" id="" />
            <br />

            <button className={ modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'} type="submit">
              {
                modoEdicion ? 'Editar' : 'Agregar'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
