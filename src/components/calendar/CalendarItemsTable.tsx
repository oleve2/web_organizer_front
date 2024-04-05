import { FC, useEffect, useState } from "react";

import { fetchCelendarItemList } from "@/rtkstore/calendarReducer";
import { CalendarData } from "@/models/models";


const CalendarItemsTable:FC = (props) => {
  const [data, set_data] =  useState<CalendarData[]>([]);
  /**/
  useEffect( () => {
    async function doWork() {
      let d = await fetchCelendarItemList();
      set_data(d);
    }

    doWork();
  },[])

  return (
    <div>
      <h2>CalendarItemsTable</h2>
      
      <div>
        {/*JSON.stringify(data)*/}
        <table>
          <thead>
            <tr>
              <td className="tabHeader">id</td>
              <td className="tabHeader">date</td>
              <td className="tabHeader">name</td>
              <td className="tabHeader">time_from</td>
              <td className="tabHeader">time_to</td>
              <td className="tabHeader">status</td>
             </tr>
          </thead>

          <tbody>
            { data.map( (item) => {
              return <tr key={item.id}>
              <td className="tabBody">{item.id}</td>
              <td className="tabBody">{item.date}</td>
              <td className="tabBody">{item.name}</td>
              <td className="tabBody">{item.time_from}</td>
              <td className="tabBody">{item.time_to}</td>
              <td className="tabBody">{item.status}</td>
              </tr>
            }) }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CalendarItemsTable;
