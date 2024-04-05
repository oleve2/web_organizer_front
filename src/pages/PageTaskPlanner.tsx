import { FC, useState } from "react";


// components
import Navigation from "../components/layout/Navigation";
import TPTanel from "../components/taskplanner/TPPanel";

interface PageTaskPlannerProps {}

const PageTaskPlanner:FC<PageTaskPlannerProps> = (props) => {


  return (
    <>
    <Navigation />
    <hr />
      
    <TPTanel />
    </>
  )
}

export default PageTaskPlanner;
