import React from "react";
import CreateEventButton from "./CreateEventButton";
import Labels from "./Labels";
export default function Sidebar() {

  
  return (
   
    <aside className="m-3 border rounded align-right p-5 w-100">
     
     <nav className="m4"  />
       <CreateEventButton  />
       <nav />

       <nav className="m4  p-2 w-40"  />
       <Labels/>
       <nav />
     
    </aside>
     

  );
}

