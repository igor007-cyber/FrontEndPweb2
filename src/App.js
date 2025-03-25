import React, {useState} from 'react';
import './index.css';
import AppRoutes from "./routes/AppRoutes";

function App() {
    const [isAuthenticated, setAuthenticated] = useState(!!localStorage.getItem("token"));

    return <AppRoutes isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />;
}

export default App;
