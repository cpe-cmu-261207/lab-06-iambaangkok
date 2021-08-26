import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CurrentPrice from './components/CurrentPrice';
import HistorySelect from './components/HistorySelect';
import HistoryResult from './components/HistoryResult';



function App() {

    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");

    return (
        <Router>
            <Navbar />

            <Switch>
                <Route path='/' exact>
                    <CurrentPrice></CurrentPrice>
                </Route>
                <Route path='/current'>
                    <CurrentPrice></CurrentPrice>
                </Route>

                <Route path='/history/select' exact>
                    <HistorySelect dateFrom={dateFrom} dateTo={dateTo} setDateFrom={setDateFrom} setDateTo={setDateTo}
                        ></HistorySelect>
                </Route>
                <Route path='/history/result'>
                    <HistoryResult></HistoryResult>
                </Route>

                <Route path='/about' >
                    {/* template for /about */}
                    <div className='text-center space-y-3'>
                        <p className='text-2xl font-semibold'>About me</p>
                        <p className='text-xl'>Baangkok Vanijyananda 630610746</p>
                    </div>
                </Route>
            </Switch>


        </Router>
    );
}

export default App;
