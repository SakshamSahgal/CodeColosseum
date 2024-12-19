

function PageNotFound() {
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <button onClick={() => window.location.href = '/'}>Go to Home</button>
        </div>
    )
}

export default PageNotFound;