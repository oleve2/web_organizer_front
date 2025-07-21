import { FC } from "react";

import Xarrow from 'react-xarrows'

interface ArrowProps {
  head: string,
  tail: string,
}

const Arrow:FC<ArrowProps> = (props) => {
  return (
    <Xarrow 
      start={props.head}
      end={props.tail}
      headShape={'circle'}
      tailShape={'circle'}
      arrowTailProps={{stroke:"#9BA1A6", strokeWidth:"0.2", fill:"red", fillOpacity:"0.1"}}
      arrowHeadProps={{stroke:"#9BA1A6", strokeWidth:"0.2", fill:"red", fillOpacity:"0.1"}}
      headSize={3}
      tailSize={3}
      path={'smooth'}
      showTail={true}
      color={"black"}
      strokeWidth={1.5}
    />
  )
}

export default Arrow;
