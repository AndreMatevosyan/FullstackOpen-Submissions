import { useImperativeHandle, forwardRef, useState } from 'react'

const MoreInfo = forwardRef((props, refs) => {

    const [showView, setShowView] = useState(false)

    const detailsStyle = showView ? {display: ''} : {display: 'none'}

    const toggleVisibility = () => {
        setShowView(!showView)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div style={detailsStyle}>
            {props.children}
        </div>
    )
})

export default MoreInfo