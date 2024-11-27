import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sign from './Pages/Sign';
import Main from './Pages/Main'; // Страница main.jsx

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Sign />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </Router>
    );
};

export default App;

