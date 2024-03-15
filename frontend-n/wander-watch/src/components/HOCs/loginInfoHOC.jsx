import React, { Suspense } from "react"
import { Await,  } from "react-router-dom"
import { useLoaderData } from "react-router-dom"

export const LoginInfoHOC = ({ children, errorElement, fallback }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loaderData = useLoaderData()

  const Children = React.cloneElement(children)
  return (
    <Suspense fallback={fallback ?? null}>
        <Await resolve={loaderData.userInformation} errorElement={errorElement ?? null}>
          { (data) => typeof(children) == 'function' ? children(data) : <Children data={data}/> }
        </Await>
      </Suspense>
  )
}
