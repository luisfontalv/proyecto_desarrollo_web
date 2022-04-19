import React from 'react'
import {firebase} from '../firebase'
import {nanoid} from 'nanoid'

const Formulario = () =>{
    const[fruta, setFruta] = React.useState('')
    const [descripcion, setDescripcion ] = React.useState('')
    const [lista, setLista] = React.useState([])
    //const [id, setId] = React.useState('')

    React.useEffect(()=>{
        const obtenerDatos = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('frutas').get()
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

        if(!fruta.trim()){
            return alert('Campo fruta vacío')
        }

        if(!descripcion.trim()){
            return alert('Campo descripción vacío')
        }
        try{
            const db = firebase.firestore()
            const nuevaFruta = {
                nombreFruta:fruta,
                nombreDescripcion:descripcion
            }
            await db.collection('frutas').add(nuevaFruta)
            setLista([...lista,
                {id:nanoid(), nombreFruta: fruta, nombreDescripcion: descripcion}
            ])
        }catch(error){
            console.log(error)
        }

        
    }

    const eliminar= async (id) =>{
        try{
            const db = firebase.firestore()
            await db.collection('frutas').doc(id).delete()
            const aux = lista.filter(item => item.id !== id)
            setLista(aux)
        }catch(error){
            console.log(error)
        }
    }

  
    return (
        <div className='container mt-5'>
            <h1 className='text-center'>CRUD BÁSICO REACT</h1>
            <hr/>
            <div className='row'>
                <div className="col-8">
                    <h4 className="text-center">Listado de frutas</h4>
                    <ul className="list-group">
                    {
                        lista.map((item)=>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.nombreFruta} - {item.nombreDescripcion}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>Eliminar</button>
                                <button className='btn btn-warning btn-sm float-end'>editar</button>
                            </li>
                        ))
                    }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">Agregar Frutas</h4>
                    <form onSubmit={guardarDatos}>
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Frutra'
                            onChange={(e)=>setFruta(e.target.value)}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Descripción'
                            onChange={(e)=>setDescripcion(e.target.value)}
                        />
                        <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario
