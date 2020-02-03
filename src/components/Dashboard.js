// IMPORT EXTERNAL LIBRARIES/MODULES
import React, {useState, useEffect, useContext,useRef} from 'react';
import {useHistory} from "react-router-dom";
// IMPORT API & ROUTE ACTIONS
import {usePlanetSearch, usePlanetDetails} from '../effects';
import {ReactReduxContext, useDispatch} from 'react-redux';
import {loginUserFailure} from '../redux/actions/authActions';
import Loader from './Loader'

const Dashboard = () => {
    const {store} = useContext(ReactReduxContext);
    const userName = store.getState().auth.user || JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const [{results, isLoading, count}, searchPlanet] = usePlanetSearch();
    const [{planet, isPlanetLoading}, getPlanet] = usePlanetDetails();
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const history = useHistory();
    let planetList = [...results] || {};
    const ref = useRef(null);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        searchPlanet('', 1);
        let widthCalc = ref.current ? ref.current.offsetWidth : 0;
        setWidth(widthCalc);
    }, [ref.current]);

    /*
    * onLogout function for user Loagout
    * */
    const onLogout = () => {
        /* removes user from Localstorage */
        localStorage.removeItem('user');
        dispatch(loginUserFailure());
        history.push("/");
    }

    /*
    * Handles search of Planets
    * @param {e} event Event on input
    * @return nothing
    * */
    const handleSearch = (e) => {
        setCurrentPage(1);
        setSearchText(e.target.value);
        searchPlanet(e.target.value, 1);
    }

    /*
    * Shows Rainbow colors
    * @return HEX code of Color
    * */
    const rainbowStop = () => {
        let h = Math.random()
        let f = (n, k = (n + h * 12) % 12) => .5 - .5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        let rgb2hex = (r, g, b) => "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join('');
        return (rgb2hex(f(0), f(8), f(4)));
    }

    /*
    * @param {population}  population of the planet
    * @return Ratio of Population
    * */
    const widthOnPopulation = (population) => {
        let populationInt = parseInt(population);
        let widthCalc = width-30;
        /* Divided population of planets in four parts */
        let arrayMilestones = [{p:10000000,q:25},{p:500000000,q:50},{p:7000000000,q:75},{p:1000000000000,q:100}];
        for(let arrayMilestoneElement of arrayMilestones){
            if (populationInt <= arrayMilestoneElement['p']) {
                return ((populationInt * widthCalc * (arrayMilestoneElement['q']/100)) / arrayMilestoneElement['p']) + 'px';
            }
        }
    }

    /*
    * Array for Storing page numbers
    * */
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(count / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    /*
    * Renders page number based on pageNumbers array
    * */
    const renderPageNumbers = pageNumbers.map(number => {
        let pageClass = ['custom-pagination-class', 'page-item', 'page-link'];
        if (number === currentPage) {
            pageClass.push('active')
        }
        return (
            <li className={pageClass.join(' ')} key={number}
                onClick={e => {
                    setCurrentPage(number);
                    searchPlanet(searchText, number)
                }}>
                {number}
            </li>
        );
    });

    return (
        <>
            <div className="container-fluid sticky-top navbar-light bg-light padding-top-bottom-10">
                <div className="row">
                    <div className="col-md-3 col-sm-1"></div>
                    <div className="col-md-6 col-sm-9">
                        <input type="text" className="form-control" id="inputSearch"
                               placeholder="Search planets!"
                               value={searchText} onChange={handleSearch}/>
                    </div>
                    <div className="col-md-3 col-sm-2 text-right">
                        <span className="user-dashboard">Hi! {userName}</span>
                        <button onClick={onLogout} className="btn btn-outline-success float-right"
                                type="button">Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-flid">
                <div className="row">
                    <div className="col-md-7 text-center" ref={ref}>
                        {isLoading ? (
                                <Loader/>
                            ) :
                            (<div className="hide-overflow planet-list-outer">
                                {planetList.length > 0 ? (
                                    planetList.map((planet, i) => (
                                        <div key={i} onClick={e => getPlanet(planet.url)} className="bg-light">
                                            {(planet.population !== "unknown") ?
                                                (
                                                    <div className="planet-outer mb-2 rounded"
                                                         style={{
                                                             width: widthOnPopulation(planet.population),
                                                             backgroundColor: rainbowStop()
                                                         }}
                                                    >
                                                        <span
                                                            className="planet-title">{planet.name}</span>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className="planet-outer mb-2 rounded" key={i}
                                                         style={{width: '100%', backgroundColor: rainbowStop()}}
                                                         onClick={e => getPlanet(planet.url)}>
                                                        <span
                                                            className="planet-title">{planet.name} - Population uknown</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                ) : (
                                    <div>No planets</div>
                                )}
                                {planetList.length > 0 ?
                                    (<nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            {renderPageNumbers}
                                        </ul>
                                    </nav>) :
                                    ''}
                            </div>)
                        }
                    </div>
                    <div className="col-md-5 outer-div text-center">
                        {isPlanetLoading ? (
                                <Loader/>
                            ) :
                            (planet !== null && planet !== '')
                                ?
                                (
                                    <div className="text-left">
                                        <h4 className="card-title"> {planet.name}</h4>
                                        <div className="card-text"><b>Diameter:</b> {planet.diameter}</div>
                                        <div className="card-text"><b>Rotation period:</b> {planet.rotation_period}
                                        </div>
                                        <div className="card-text"><b>Orbital period:</b> {planet.orbital_period}</div>
                                        <div className="card-text"><b>Climate:</b> {planet.climate}</div>
                                        <div className="card-text"><b>Gravity:</b> {planet.gravity}</div>
                                        <div className="card-text"><b>Terrain:</b> {planet.terrain}</div>
                                        <div className="card-text"><b>Surface water:</b> {planet.surface_water}</div>
                                        <div className="card-text"><b>Population:</b> {planet.population}</div>
                                        {planet.residents.length > 0 ? (
                                            <div className="card-text"><b>Residents:</b>
                                                {
                                                    planet.residents.map((resident, i) => (
                                                        <div key={i}>{resident}</div>
                                                    ))
                                                }
                                            </div>) : ''}
                                        {planet.films.length > 0 ? (
                                            <div className="card-text"><b>Films:</b>
                                                {
                                                    planet.films.map((film, i) => (
                                                        <div key={i}>{film}</div>
                                                    ))
                                                }
                                            </div>) : ''}
                                    </div>
                                )
                                : ''
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
