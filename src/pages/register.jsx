import axios from "axios"
import { useNavigate } from "react-router-dom"
import {useForm} from 'react-hook-form';


export default function Register() {
  let {register, handleSubmit, watch, formState : { errors }} = useForm();
  let contra = watch("contrasena");
  let navigate = useNavigate();

  let onSubmited = async (data)=>{
        console.log(data);
        try {
            let respuesta = await axios.post("http://localhost/loginApi/login", {
              nombre:data.nombre,
              correo:data.correo,
              contrasena:data.contrasena
            });
            alert(respuesta.data.message);
            navigate("/login");
            console.log("datos del formulario");
            console.log(respuesta);
        } catch (error) {
            console.log("Respuesta de la consola");
            console.log(error);
        }
    };
  return (
     <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-8">
                    <h1 className='text-center text-primary my-5'>Formulario de registro</h1>
                </div>
                <div className="col-sm-8">
                <form onSubmit={handleSubmit(onSubmited)} className='bg-body-secondary p-3 rounded'>
                    <div className="mb-3">
                        <label className="form-label">Nombre de usuario</label>
                        <input type="text" {...register("nombre", {required: true})} className="form-control"  aria-describedby="emailHelp"/>
                        { errors.nombre && <p className='text-danger'>Debes escribir un nombre de usuario</p> }
                     </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" {...register("correo", {required: true})} className="form-control"  aria-describedby="emailHelp"/>
                        { errors.correo && <p className='text-danger'>Debes escribir un cooreo</p> }
                     </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" {...register("contrasena", {required: true})} className="form-control" />
                        { errors.contrasena && <p className='text-danger'>La contraseña es obligatoria</p> }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirmar contraseña</label>
                        <input type="password" {...register("confirmar_contrasena", 
                        {required: "Por favor digite una contraseña", validate: (value)=> value == contra || "la contraseña no coincide"})
                      } className="form-control" />
                        { errors.confirmar_contrasena && <p className='text-danger'>{errors.confirmar_contrasena.message}</p> }
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                </div>
            </div>
        </div>
    </>
  )
}
