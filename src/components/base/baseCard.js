import { Link } from "react-router-dom"

export default function BaseCard(props) {
  return (
    <div className="base-card">
      <div><Link to={props.item.prodLink}>#{props.item.id}</Link> Part: {props.item.part}</div>
      <div>Theme: {props.item.theme}</div>
      <div>Title: {props.item.title} </div>
      <div>{props.item.text.slice(0,30)}...</div> {/**/}
    </div>
  )
}
