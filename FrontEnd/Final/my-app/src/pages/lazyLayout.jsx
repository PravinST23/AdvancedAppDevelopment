import { Suspense } from "react"
import propTypes from "prop-types";
import LoadingSpinner from "./loading";
const LazyLayout=({component:Component,...rest})=>{
    return(
        <Suspense fallback={<LoadingSpinner />}>
            <Component {...rest} />
        </Suspense>
    )
}

LazyLayout.propTypes ={
    component: propTypes.elementType.isRequired
}

export default LazyLayout;