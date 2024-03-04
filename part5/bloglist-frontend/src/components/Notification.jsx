import '../index.css'

const Notification = ( {message, error} ) => {

    if (!message) {
        return null
    }

    const messageStyle = error ?  'error' : 'added'

    return (
        <div className={messageStyle}>
            {message}
        </div>
    )
}

export default Notification
