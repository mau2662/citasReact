import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setnombre] = useState("");
  const [propietario, setpropietario] = useState("");
  const [email, setemail] = useState("");
  const [fecha, setfecha] = useState("");
  const [sintomas, setsintomas] = useState("");
  const [error, seterror] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setnombre(paciente.nombre)
      setpropietario(paciente.propietario)
      setemail(paciente.email)
      setfecha(paciente.fecha)
      setsintomas(paciente.sintomas)

    }
  }, [paciente])

  const generarID = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //validacion de formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Hay campos vacios");

      seterror(true);
      return;
    }
    seterror(false);

    //Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    };

    if (paciente.id) {
      // editando  registro
      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id ===
        paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})

    } else {
      // nuevo registro
      objetoPaciente.id = generarID();
      setPacientes([...pacientes, objetoPaciente]);

    }



    //Reiniciar el form
    setnombre("");
    setpropietario("");
    setemail("");
    setfecha("");
    setsintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        {" "}
        Seguimiento Pacientes
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && (
          <Error>
            <p> Todos los campos son obligatorios </p>{" "}
          </Error>
        )}

        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 font-bold uppercase"
          >
            {" "}
            Nombre de la Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md"
            value={nombre}
            onChange={(e) => setnombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 font-bold uppercase"
          >
            {" "}
            Nombre del Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md"
            value={propietario}
            onChange={(e) => setpropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold uppercase"
          >
            {" "}
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingrese su Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 font-bold uppercase"
          >
            {" "}
            Fecha de Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md"
            value={fecha}
            onChange={(e) => setfecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 font-bold uppercase"
          >
            {" "}
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setsintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700
                cursor-pointer transi "
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </div>
  );
};

export default Formulario;
