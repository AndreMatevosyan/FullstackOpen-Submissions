import '../styles/index.css'

const Notification = ( {message, error} ) => {

    if (message === null) {
        return null
    }

    const messageStyle = error ?  'error' : 'update'
    console.log(messageStyle)

    return (
        <div className={messageStyle}>
            {message}
        </div>
    )
}

export default Notification
