import React from 'react'
import {firebase} from '../firebase'
import {nanoid} from 'nanoid'

const Formulario = () =>{
    const[cargador, setCargador] = React.useState('')
    const [descripcion, setDescripcion ] = React.useState('')
    const [dislikes, setDislikes ] = React.useState(0)
    const [likes, setLikes ] = React.useState(0)
    const [enlace, setEnlace ] = React.useState("")
    const [nombre, setNombre ] = React.useState("")
    const [proveedor, setProveedor ] = React.useState("")
    
    const [lista, setLista] = React.useState([])
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [id, setId] = React.useState('')
    const [error, setError] = React.useState(null)

    React.useEffect(()=>{
        const obtenerDatos = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('videos').get()
                const array = data.docs.map(item =>(
                    {
                        id:item.id, ...item.data()
                    }
                ))
                setLista(array)

            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos()

    })

    const guardarDatos = async (e) =>{
        e.preventDefault()

        if(!cargador.trim()){
            setError('Campo cargador vacío')
            return
        }

        if(!enlace.trim()){
            setError('Campo enlace vacío')
            return
        }

        if(!nombre.trim()){
            setError('Campo nombre vacío')
            return
        }

        if(!proveedor.trim()){
            setError('Campo proveedor vacío')
            return
        }

        if(!descripcion.trim()){
            setError('Campo descripción vacío')
            return
        }

        try{
            const db = firebase.firestore()
            const nuevo = {
                nombre,
                descripcion,
                likes,
                cargador,
                proveedor,
                dislikes,
                enlace
            }
            await db.collection('videos').add(nuevo)
            setLista([...lista,
                {id:nanoid(), ...nuevo}
            ])
        }catch(error){
            console.log(error)
        }

        cancelar()
    }

    const eliminar= async (id) =>{
        try{
            const db = firebase.firestore()
            await db.collection('videos').doc(id).delete()
            const aux = lista.filter(item => item.id !== id)
            setLista(aux)
        }catch(error){
            console.log(error)
        }
    }

    const auxEditar = (item) =>{
        setCargador(item.cargador)
        setNombre(item.nombre)
        setEnlace(item.enlace)
        setDislikes(item.dislikes)
        setLikes(item.likes)
        setProveedor(item.proveedor)
        setDescripcion(item.descripcion)
        setModoEdicion(true)
        setId(item.id)
    }

    const editar = async e =>{
        e.preventDefault()
        if(!cargador.trim()){
            setError('Campo cargador vacío')
            return
        }

        if(!enlace.trim()){
            setError('Campo enlace vacío')
            return
        }

        if(!nombre.trim()){
            setError('Campo nombre vacío')
            return
        }

        if(!proveedor.trim()){
            setError('Campo proveedor vacío')
            return
        }

        if(!descripcion.trim()){
            setError('Campo descripción vacío')
            return
        }
        
        try{
            const db= firebase.firestore()
            await db.collection('videos').doc(id).update({
                nombre,
                descripcion,
                likes,
                cargador,
                proveedor,
                dislikes,
                enlace
            })

           
        }catch(error){
            console.log(error)
        }
        cancelar()

    }

    const cancelar =()=>{
        setCargador('')
        setNombre('')
        setEnlace('')
        setDislikes(0)
        setLikes(0)
        setProveedor('')
        setDescripcion('')
        setModoEdicion(false)
        setError(null)
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>CRUD BÁSICO REACT</h1>
            <hr/>
            <div className='row'>
                <div className="col-8">
                    <h4 className="text-center">Listado de películas</h4>
                    <ul className="list-group">
                    <li className='list-group-item'>
                                <span className='lead'>Nombre - Enlace - Proveedor - Cargador - Likes - Dislikes - Descripción</span>
                    </li>
                    {
                        lista.map((item)=>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.nombre} - {item.enlace} - {item.proveedor} - {item.cargador} - {item.likes} - {item.dislikes} - {item.descripcion}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>Eliminar</button>
                                <button className='btn btn-warning btn-sm float-end' onClick={()=> auxEditar(item)}>editar</button>
                            </li>
                        ))
                    }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                    {
                        modoEdicion ? 'Editar Películas': 'Agregar Películas'
                    }</h4>
                    <form onSubmit={modoEdicion ? editar: guardarDatos}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese cargador'
                            onChange={(e)=>setCargador(e.target.value)}
                            value = {cargador}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese nombre'
                            onChange={(e)=>setNombre(e.target.value)}
                            value = {nombre}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese enlace'
                            onChange={(e)=>setEnlace(e.target.value)}
                            value = {enlace}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese proveedor'
                            onChange={(e)=>setProveedor(e.target.value)}
                            value = {proveedor}
                        />
                        <input
                            className='form-control mb-2'
                            type="number"
                            placeholder='Ingrese likes'
                            onChange={(e)=>setLikes(e.target.value)}
                            value = {likes}
                        />
                        <input
                            className='form-control mb-2'
                            type="number"
                            placeholder='Ingrese dislikes'
                            onChange={(e)=>setDislikes(e.target.value)}
                            value = {dislikes}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Descripción'
                            onChange={(e)=>setDescripcion(e.target.value)}
                            value = {descripcion}
                        />{
                            !modoEdicion? (
                                <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                            )
                            :
                            (  <>
                                <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                                <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>Cancelar</button>
                                </>
                            )
                        }
                                              
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario
