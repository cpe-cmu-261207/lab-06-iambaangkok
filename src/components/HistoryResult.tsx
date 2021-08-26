import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type PriceType = {
    index : number;
    date : string;
    price : any;
}

const HistoryResult = () => {
    const [prices, setPrices] = useState<PriceType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    let query = new URLSearchParams(useLocation().search);

    const start = query.get("start");
    const end = query.get("end");

    const fetchApi = async () => {
        setLoading(true);
        try {
            const resp = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${start}&end=${end}`);
            console.log(resp.data);
            
            var dataPrices = [];
            var i = 0;
            for (const [key, value] of Object.entries(resp.data.bpi)) {
                //console.log(`${key}: ${value}`);
                dataPrices.push({index:i, date:key, price:value})
                i++;
            }
            console.log(dataPrices);

            setPrices(dataPrices);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    return (
        <div>
            {/* template for /history/result */}
            <div className='text-center space-y-3'>
                <p className='text-2xl font-semibold'>Historical price</p>
                <p className='text-2xl'>{loading? "Loading ..." : ""}</p>
                <p className='text-2xl text-red-500'>{error? "There was an error. Please try again later." : ""}</p>
                <p className='text-xl font-semibold'> ( From {start} To {end})</p>
                <ul>
                    {prices.map(x => <li className='text-xl'>{x.date} - {(x.price).toLocaleString()} THB</li>)}
                </ul>
            </div>
            <br />
        </div>
    )

}

export default HistoryResult;