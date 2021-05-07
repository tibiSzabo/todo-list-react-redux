const ErrorMessage = (props) => (
    <div className='error-message-container'>
        <i className="fas fa-exclamation-triangle"></i>
        <span>{props.msg}</span>
    </div>
);

export default ErrorMessage;