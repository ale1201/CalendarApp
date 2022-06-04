import React, { useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
//import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

const Countries = [
  "s",
  "h"
];

/* const categorias = [
  "Reunión academica",
  "Parcial",
  "Ejercicio",
  "Amigos",
  "Trabajo",
  "Repaso academico",
]; */

export default function EventModal() {
  const {
    setShowEventModal,
    setShowPointsModal,
    setSelectedStatus,
    daySelected,
    //indexCategoria,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  var hoy = new Date(dayjs());
  var hora = hoy.getMinutes().toString().length===2 ? hoy.getHours() + ':' + hoy.getMinutes(): hoy.getHours() + ':0' + hoy.getMinutes()

  const estados = {
    "end_on_time":"Finalizada a tiempo",
    "end_before_time":"Finalizada antes de tiempo",
    "end_after_time":"Finalizada después de tiempo",
    "started_not_finalized":"Se empezó pero no se finalizó",
    "not_started":"No se empezó"
  }

  const puntos = {
    "end_on_time": 5,
    "end_before_time":4,
    "end_after_time":3,
    "started_not_finalized":2,
    "not_started":1
  }
  const [usuario, setUsuario] = useState();

  useEffect(() => {
      fetch("http://localhost:5000/api/usuario/" + localStorage.getItem('user_id') )
        .then((response) => response.json())
        .then((data) => {
          setUsuario(
            data
          );
        });
    }, []);
  
  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [hourIni, setHourIni] = useState(
    selectedEvent ? selectedEvent.hourIni : "00:00"
  );
  const [hourFin, setHourfin] = useState(
    selectedEvent ? selectedEvent.hourFin : "00:00"
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [priority, setPriority] = useState(
    selectedEvent ? selectedEvent.priority : "baja"
  );
  const [estado, setEstado] = useState(
    selectedEvent ? selectedEvent.estado : null
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  async function createTask(data) {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:5000/api/actividad/", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("Ocurrió un error en la creación de la actividad:", error);
      });
  }

  async function updateTask(id, data) {
    const requestOptions = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    console.log("aufff")
    fetch("http://localhost:5000/api/actividad/"+id, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("Ocurrió un error en la actualización de la actividad:", error);
      });
  }

  async function deleteTask(id) {
    fetch("http://localhost:5000/api/actividad/"+id, {
      method: "DELETE",
    }).then((res) => res.text()) // or res.json()
    .then((res) => console.log(res));
  }



  function conditionals() {
    var cond1 = selectedEvent.hourFin.localeCompare(hora) === -1

    var newday = hoy.setHours(0,0,0,0)

    
    return hoy.valueOf() > selectedEvent.day  || (newday.valueOf() == selectedEvent.day && cond1)
  }

  function updatePoints(data){
    const requestOptions = {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:5000/api/usuario/"+localStorage.getItem("user_id"), requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("Ocurrió un error en la actualización de la actividad:", error);
      });
  }


  function handleSubmit(e, flag) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      hourIni,
      hourFin,
      priority,
      estado,
      UsuarioId: localStorage.getItem("user_id"),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      console.log("ALGOOO")
      if(flag === true){
        console.log('PUTO')
        updatePoints({"puntos": 12})
      }
      dispatchCalEvent({ type: "update", payload: calendarEvent });
      updateTask(selectedEvent.id, {"title":title,"day":daySelected.valueOf(),"hourIni":hourIni, "hourFin": hourFin, "description": description, "priority":priority, "label": selectedLabel, "UsuarioId":parseInt(localStorage.getItem("user_id"))})
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
      createTask({"id": selectedEvent ? selectedEvent.id : Date.now(), "title":title,"day":daySelected.valueOf(),"hourIni":hourIni, "hourFin": hourFin, "description": description, "priority":priority, "label": selectedLabel, "UsuarioId":parseInt(localStorage.getItem("user_id"))})
    }

    setShowEventModal(false);
  }

  const handleSubmitStatus = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      hourIni,
      hourFin,
      priority,
      estado,
      UsuarioId: localStorage.getItem("user_id"),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      setSelectedStatus(estado)
      updatePoints({"puntos": usuario.puntos += puntos[estado]})
      
      dispatchCalEvent({ type: "update", payload: calendarEvent });
      updateTask(selectedEvent.id, {"title":title,"day":daySelected.valueOf(),"hourIni":hourIni, "hourFin": hourFin, "description": description, "priority":priority, "label": selectedLabel, "estado": estado, "UsuarioId":parseInt(localStorage.getItem("user_id"))})
    }

    setShowEventModal(false);
    setShowPointsModal(true);
    
    
  }


  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <element>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                  deleteTask(selectedEvent.id);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </element>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            {(!selectedEvent || (selectedEvent && !conditionals())) && <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />}
            {selectedEvent && conditionals() && <p
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            > {selectedEvent.title} </p>}
            <span className="material-icons-outlined text-gray-400">
              calendar_today
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              access_time
            </span>
            
            <div className="row">
            <div className="col">
            {selectedEvent && conditionals() && <p>Desde: {selectedEvent.hourIni}</p>}
            {(!selectedEvent || (selectedEvent && !conditionals())) && <p>Desde:</p>}
            {(!selectedEvent || (selectedEvent && !conditionals())) && <select id="hourIni" onChange={(e) => setHourIni(e.target.value)} value={hourIni}>
              <option value="00:00">00:00</option>
              <option value="00:30">00:30</option>
              <option value="1:00">1:00</option>
              <option value="1:30">1:30</option>
              <option value="2:00">2:00</option>
              <option value="2:30">2:30</option>
              <option value="3:00">3:00</option>
              <option value="3:30">3:30</option>
              <option value="4:00">4:00</option>
              <option value="4:30">4:30</option>
              <option value="5:00">5:00</option>
              <option value="5:30">5:30</option>
              <option value="6:00">6:00</option>
              <option value="6:30">6:30</option>
              <option value="7:00">7:00</option>
              <option value="7:30">7:30</option>
              <option value="8:00">8:00</option>
              <option value="8:30">8:30</option>
              <option value="9:00">9:00</option>
              <option value="9:30">9:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
              <option value="22:30">22:30</option>
              <option value="23:00">23:00</option>
              <option value="23:30">23:30</option>
            </select>}
            </div>
                
            <div className="col">
            {selectedEvent && conditionals() && <p>Hasta: {selectedEvent.hourFin}</p>}
            {(!selectedEvent || (selectedEvent && !conditionals())) && <p>Hasta:</p>}
            {(!selectedEvent || (selectedEvent && !conditionals())) && <select onChange={(e) => setHourfin(e.target.value)} value={hourFin}>
              <option value="00:00">00:00</option>
              <option value="00:30">00:30</option>
              <option value="1:00">1:00</option>
              <option value="1:30">1:30</option>
              <option value="2:00">2:00</option>
              <option value="2:30">2:30</option>
              <option value="3:00">3:00</option>
              <option value="3:30">3:30</option>
              <option value="4:00">4:00</option>
              <option value="4:30">4:30</option>
              <option value="5:00">5:00</option>
              <option value="5:30">5:30</option>
              <option value="6:00">6:00</option>
              <option value="6:30">6:30</option>
              <option value="7:00">7:00</option>
              <option value="7:30">7:30</option>
              <option value="8:00">8:00</option>
              <option value="8:30">8:30</option>
              <option value="9:00">9:00</option>
              <option value="9:30">9:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
              <option value="22:30">22:30</option>
              <option value="23:00">23:00</option>
              <option value="23:30">23:30</option>
            </select>}
            </div>
            </div>
            
            
            
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            {(!selectedEvent || (selectedEvent && !conditionals())) && <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />}
            {selectedEvent && conditionals() && <p
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            > {selectedEvent.description} </p>}
            <span className="material-icons-outlined text-gray-400">
              priority_high
            </span>
            
            <div className="row">
            {selectedEvent && conditionals() && <p>Prioridad: {selectedEvent.priority}</p>}
            {(!selectedEvent || (selectedEvent && !conditionals())) && <p>Prioridad:</p>}
            {(!selectedEvent || (selectedEvent && !conditionals())) && <select id="hourIni" onChange={(e) => setPriority(e.target.value)} value={priority}>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>}
            </div>
            
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>

            {selectedEvent &&  conditionals() && <span className="material-icons-outlined text-gray-400">
              add_task
            </span>}
            {selectedEvent &&   conditionals() && selectedEvent.estado == null&& <div className="row">
              <p>Estado:</p>
            <select id="hourIni" onChange={(e) => setEstado(e.target.value)} value={estado}>
              <option value="">...</option>
              <option value="end_on_time">Finalizada a tiempo</option>
              <option value="end_before_time">Finalizada antes de tiempo</option>
              <option value="end_after_time">Finalizada después de tiempo</option>
              <option value="started_not_finalized">Se empezó pero no se finalizó</option>
              <option value="not_started">No se empezó</option>
            </select>
            </div>}
            {selectedEvent &&  conditionals() && selectedEvent.estado != null && <div className="row">
              <p>Estado: {estados[selectedEvent.estado]}</p>
            </div>}
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-7">
        {selectedEvent &&  conditionals() && selectedEvent.estado == null && <button
            type="submit"
            onClick={handleSubmitStatus}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Registrar actividad
          </button>}
        {selectedEvent && !conditionals() && <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Update
          </button>}

          {!selectedEvent && <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>}

        </footer>
      </form>
    </div>
  );
}
