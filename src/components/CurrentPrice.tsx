import axios from 'axios'
import { useState, useEffect } from 'react'

const CurrentPrice = () => {
    const [lastUpdated, setLastUpdated] = useState<String>("");
    const [price, setPrice] = useState<String>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchApi = async () => {
        setLoading(true);
        try {
            const resp = await axios.get(`https://api.coindesk.com/v1/bpi/currentprice/thb.json`);
            console.log(resp.data);
            var thb_rate = await resp.data.bpi.THB.rate;
            var last_updated = await resp.data.time.updated;
            console.log(thb_rate);
            console.log(last_updated);
            setPrice(thb_rate);
            setLastUpdated(last_updated);
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
            {/* template for /current */}
            <div className='text-center space-y-3'>
                <p className='text-2xl font-semibold'>Current price</p>
                <p className='text-2xl'>{loading? "Loading...":""}</p>
                <p className='text-2xl'>{price? price:""} THB</p>
                <p> (Last updated {lastUpdated? lastUpdated:""}) </p>
            </div>
            <br />
        </div>
    )
}

export default CurrentPrice;