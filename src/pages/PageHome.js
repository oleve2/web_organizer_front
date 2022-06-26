import Navigation from '../components/layout/Navigation';

import { useEffect, useState } from 'react';
import galaxy from '../assets/galaxy.jpg';
import squirtel from '../assets/squirtel.jpeg';

export default function PageHome(props) {
  const [pic, setPic] = useState(galaxy)

  useEffect( () => {
    document.title = "WA3: Home";
  },[])

  const changePic = () => {
    (pic === galaxy) ? setPic(squirtel) : setPic(galaxy);
  }

  return (
    <>
    <Navigation/>
    <hr/>    

    <div className='home-wrapper'>
      <h2 className='centered'>Главная страница</h2>
      <img className='centered home-img' 
        src={pic} alt='pic' 
        onClick={changePic}
      />

    </div>
    </>
  )
}
