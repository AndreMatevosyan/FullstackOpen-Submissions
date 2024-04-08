import { useState } from 'react'

const Toggleable = props => {
  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? '' : 'none' }
  const showWhenVisible = { display: visible ? 'none' : '' }

  const changeVisiblility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={changeVisiblility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={changeVisiblility}>cancel</button>
      </div>
    </div>
  )
}

export default Toggleable