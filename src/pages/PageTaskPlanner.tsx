import { FC, useState } from "react";
import Navigation from "../components/layout/Navigation";

// components
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
