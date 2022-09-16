
export default function ModTable(props) {
  return (
    <>
    <table>
      <thead>
        <tr>{/*header*/}
          <td className="tabHeader">id</td>
          <td className="tabHeader">activ_name_id</td>
          <td className="tabHeader">activ_name</td>
          <td className="tabHeader">activ_norm_id</td>
          <td className="tabHeader">activ_date</td>
          <td className="tabHeader">activ_value</td>
          <td className="tabHeader"></td>
        </tr>
      </thead>

      
      <tbody>{/*body*/}
      { props.activs.map( (item) => {
        return <tr key={item.id}>
          <td className="tabBody">{item.id}</td>
          <td className="tabBody">{item.activ_name_id}</td>
          <td className="tabBody">{item.activ_name}</td>
          <td className="tabBody">{item.activ_norm_id}</td>
          <td className="tabBody">{item.activ_date}</td>
          <td className="tabBody">{item.activ_value}</td>
          <td className="tabBody">
            <button className="button-control button-edit" onClick={ () => { props.handleEdit(item.id) } }>Edit</button>  | 
             <button className="button-control button-delete" onClick={ () => { props.handleDelete(item.id) } }>Delete</button>
          </td>
      </tr>
      }) } 
      </tbody>
    </table>
    </>
  )
}


