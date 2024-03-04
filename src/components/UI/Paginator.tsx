// styles
import './Paginator.css';

interface PaginatorProps<T> {
  activePageNum: number,
  numOfPages: number,
  setActivePageNum: (val: number) => void,
}

//
const Paginator = <T,>(props: React.PropsWithChildren<PaginatorProps<T>>) => {
  const handleMinus = () => {
    if (props.activePageNum > 0) {
      props.setActivePageNum(props.activePageNum - 1);
    }
  }

  const handlePlus = () => {
    if (props.activePageNum < (props.numOfPages -1)) {
      props.setActivePageNum(props.activePageNum + 1);
    }
  }

  const pagesArr = Array.from( Array(props.numOfPages).keys() );

  return (<div>
    <div>page {props.activePageNum + 1} of {props.numOfPages}</div> <br />

    <div className='div_pages'>
      <div className='div_pagesItem' onClick={handleMinus}>&#60;</div>

      { pagesArr.map( (item) => {
        return <div key={item} 
          className={'div_pagesItem' + (props.activePageNum === item ? ' div_pagesItem__active' : '' )  }
          onClick={() => { props.setActivePageNum(item) }}
        >
          {item+1}
        </div>
      }) }

      <div className='div_pagesItem' onClick={handlePlus}>&#62;</div>
    </div>
  </div>
  )
}

export default Paginator;
