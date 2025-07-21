import { useState } from 'react';

// styles
import './Paginator.css';

interface PaginatorProps<T> {
  activePageNum: number,
  numOfPages: number,
  setActivePageNum: (val: number) => void,
}

/*
2025-03-18
Чтобы при возвращении из карточки пагинатор не сбрасывал состояние в котором он был до проваливания - добавил в компонент стейт activePageNum
Изначально берет данные из стора
Спорный момент - когда внутри компонента изменяется значение, то одновременно апдейтится и локальная переменная, и стейт - насколько это верно?

*/

//
const Paginator = <T,>(props: React.PropsWithChildren<PaginatorProps<T>>) => {
  const [activePageNum, set_activePageNum] = useState<number>(props.activePageNum);

  const handleMinus = () => {
    if (activePageNum > 0) {
      props.setActivePageNum(activePageNum - 1);
      set_activePageNum(activePageNum - 1);
    }
  }

  const handlePlus = () => {
    if (activePageNum < (props.numOfPages -1)) {
      props.setActivePageNum(activePageNum + 1);
      set_activePageNum(activePageNum + 1);
    }
  }

  const pagesArr = Array.from( Array(props.numOfPages).keys() );

  return (<div>
    <div>page {activePageNum + 1} of {props.numOfPages}</div> <br />

    <div className='div_pages'>
      <div className='div_pagesItem' onClick={handleMinus}>&#60;</div>

      { pagesArr.map( (item) => {
        return <div key={item} 
          className={'div_pagesItem' + (activePageNum === item ? ' div_pagesItem__active' : '' )  }
          onClick={() => { 
            props.setActivePageNum(item);
            set_activePageNum(item);
          }}
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
