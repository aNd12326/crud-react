import React from 'react';
import { nanoid } from 'nanoid'

function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoedicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)


  const agregarTarea = (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('elemento vacio')
      setError('Escriba algo porfavor...!')
      return
    }
    console.log(tarea)

    setTareas([
      ...tareas,
      { id: nanoid(10), nombreTarea: tarea }
    ])

    setTarea('')
    setError(null)
  }

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = (item) => {
    console.log(item)
    setModoedicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }


  const editarTarea = (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('elemento vacio')
      setError('Escriba algo porfavor...!')
      return
    }

    const arrayEditado = tareas.map(
      item => item.id === id ? { id, nombreTarea: tarea } : item
    )

    setTareas(arrayEditado)
    setModoedicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className='text-center'>Crud Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className='text-center'>Lista de tareas</h4>
          <ul className="list-group">

            {

              tareas.length === 0 ? (
                <li className="list-group-item">No hay Tareas</li>
              ) : (
                tareas.map(item => (
                  <li
                    key={item.id}
                    className="list-group-item"
                  >
                    <span className='lead'>{item.nombreTarea}</span>
                    <button
                      onClick={() => eliminarTarea(item.id)}
                      className="btn btn-danger btn-sm float-right mx-2"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => editar(item)}
                      className="btn btn-warning btn-sm float-right mx-2"
                    >
                      Editar
                    </button>
                  </li>
                )) 
              )
            }

          </ul>
        </div>
        <div className="col-4">
          <h4 className='text-center'>
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input
              type="text"
              className='form-control mb-2'
              placeholder='Ingrese Tarea'
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />

            {
              modoEdicion ? (
                <button
                  className="btn btn-warning btn-block"
                  type='submit'
                >
                  Editar
                </button>
              ) : (
                <button
                  className="btn btn-dark btn-block"
                  type='submit'
                >
                  Agregar
                </button>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
