import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';


const useBiodatas = () => {

    const [biodatas, setBiodats] = useState([]);
    const [loading, setLoading] = useState(true);

    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        axiosPublic.get('/biodatas')
            .then((res) => {
                setBiodats(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [axiosPublic])
    return [biodatas, loading]
}

export default useBiodatas