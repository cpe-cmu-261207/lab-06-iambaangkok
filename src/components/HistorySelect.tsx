import { useState } from 'react'
import { Link , useHistory} from 'react-router-dom'


type HistorySelectProps  = {
    dateFrom : string;
    dateTo : string;
    setDateFrom : Function;
    setDateTo : Function;
}

const HistorySelect = ({dateFrom, dateTo, setDateFrom, setDateTo} : HistorySelectProps) => {

    const getInputDateFrom = (ev:React.ChangeEvent<HTMLInputElement>) =>{
        console.log(ev.target.value);
        setDateFrom(ev.target.value);
    }

    var history = useHistory();

    const getInputDateTo = (ev:React.ChangeEvent<HTMLInputElement>) =>{
        console.log(ev.target.value);
        setDateTo(ev.target.value);
    }

    const getData = () =>{
        var dfrom = Date.parse(dateFrom);
        var dto = Date.parse(dateTo);
        var dtoday = new Date();
        var dtodaynum = dtoday.getTime();
        console.log("" + dfrom + " | " + dto + " | " + dtodaynum);
        if(dateFrom === "" || dateTo === ""){
            alert("Invalid Start/End Date");
        }
        else if(dto > dtodaynum || dfrom > dtodaynum){
            alert("Invalid Start/End Date");
            return;
        }
        else if(dto < dfrom){
            alert("Invalid Start/End Date");
            return;
        }
        else{
            history.push("/history/result"+"?start=" + dateFrom + "&end=" + dateTo);
            console.log("getting price from date " + dateFrom + " to " + dateTo);
            console.log("?start=" + dateFrom + "&end=" + dateTo);
        }
        
    }

    return (
        <div>
            {/* template for /history/select */}
            <div className='text-center space-y-3 space-x-3'>
                <p className='text-2xl font-semibold'>Select historical range</p>
                <span>From date</span>
                <input id='datefrom' type='date' onChange={getInputDateFrom}></input>
                <span>To date</span>
                <input id='dateto' type='date' onChange={getInputDateTo}></input>
                <br />
                <button onClick={getData}>Get data</button>
            </div>

            <br />
        </div>
    )
}

export default HistorySelect;