import React from 'react'
import { withGlobalState } from 'react-globally'

const Global = ({ globalState }) => {
  return (
      console.log(globalState.test)
    // <div>
    //   The counter value: {globalState.test}
    // </div>
  )
}

export default withGlobalState(Global)
