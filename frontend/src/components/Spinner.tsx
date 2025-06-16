const Spinner = ({size='h-10 w-10',fullScreen=true}) => {
    const wrapperClasses = fullScreen ? 'w-full h-screen flex items-center justify-center': 'flex items-center justify-center';
    return ( 
        <div className={wrapperClasses}>
            <div className={`${size} border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin`}></div>
        </div>
    )
};

export default Spinner;