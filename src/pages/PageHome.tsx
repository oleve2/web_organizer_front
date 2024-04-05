

import React, { FC, useEffect, useState } from 'react';

// componnets
import Navigation from '@/components/layout/Navigation';

import galaxy from '@/assets/galaxy.jpg';
import squirtel from '@/assets/squirtel.jpeg';

interface PageHomeProps {}

//
const PageHome:FC<PageHomeProps> = (props) => {
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
      <p className='text_centered'>Главная ст<span onClick={changePic}>р</span>аница</p> 
      
      <img className='text_centered home-img' 
        src={pic} alt='pic' 
      />
    </div>
    </>
  )
}

export default PageHome;
