import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';


const useBiodatas = () => {
    const { user } = useAuth();

    const [biodatas, setBiodats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myBiodata, setMyBiodata] = useState(null);

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


        axiosPublic.get(`/biodatas/${user.email}`).then((res) => {
            setMyBiodata(res.data);
            setLoading(false);
        }).then((err) => {
            console.log(err);
        })

    }, [axiosPublic, user.email])
    return [biodatas, loading, myBiodata];
}

export default useBiodatas