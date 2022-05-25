import './App.css'
import {NavLink, Route, Routes} from "react-router-dom"
import SuperheroList from "./components/SuperheroesList/SuperheroList"
import MainPage from "./components/MainPage/MainPage"
import SuperheroDetails from "./components/SuperheroDetails/SuperheroDetails"
import SuperheroCreate from "./components/SuperheroCreate/SuperheroCreate"

function App() {
    return (
        <div className="App">
            <header className="header">
                <ul className="headerList">
                    <li className="listItem"><NavLink className="link" to="/list">LIST</NavLink></li>
                    <li className="listItem"><NavLink className="link" to="/create">CREATE</NavLink></li>
                    <li className="listItem"><NavLink className="link" to="/">HOME</NavLink></li>
                </ul>
            </header>
            <div className="content">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/create" element={<SuperheroCreate/>}/>
                    <Route path="list" element={<SuperheroList/>}/>
                    <Route path="list/:id" element={<SuperheroDetails/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
