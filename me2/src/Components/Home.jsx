import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Footer from './Footer';
const Home = () => {
    const roomId = useRef(null);
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        navigate(`/room/${roomId.current.value}`);
    };
    return (
        <div className="App">
            <img src="/logos.svg" alt="logo" width={400}/>
            <p><code>Enter or Create a Room ID to join</code></p> <br />
            <form onSubmit={submit}>
                <input type="text" ref={roomId} placeholder="Enter Room ID" required />
                <svg onClick={
                    () => roomId.current.value = uuidv4().substring(0, 12)
                } xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                    <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                </svg>
                <p></p>
                <button type="submit">Join Room</button>
            </form>
            <Footer></Footer>
        </div>
    )
}

export default Home