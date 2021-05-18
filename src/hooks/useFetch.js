import  { useState, useEffect, useRef, useCallback }  from 'react';

function useFetch (defaultUrl, defaultCallback)  {
    const [dataset, setDataset] = useState({data: null, error: null});
    const [url, setNewUrl] = useState(defaultUrl);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!url) return;

        fetchFunc(url);
        console.log('Render!');
        return () => isMounted.current = false;
    // eslint-disable-next-line
    }, [url]);

    const fetchData = async (url) => {
        isMounted.current = true;
        const response = await fetch(url);
        const data = await response.json();

        return data
    };

    const fetchFunc = (url) => {
        fetchData(url)
            .then(response => {
                if (!isMounted.current) {
                    throw new Error('Component was unmounted');
                }
                setDataset({...dataset, data: response});
                isMounted.current = false;

                return response
            })
            .then(defaultCallback)
            .catch(e => {
                setDataset({...dataset, error: e.message});
        });
    }

    const setUrl = (newUrl) => {
        setNewUrl(newUrl);
        //console.log("setUrl", dataset);
    }

    const setData = useCallback(
         (el) => {
             if (isMounted.current) return
             let item = el || dataset.data.length+1;
             let specificDataArray = dataset.data.slice();
             specificDataArray.push({id: item})
             setDataset({...dataset, data: specificDataArray });
             //console.log("setData", dataset);
        },
        [dataset]
    );

    return { ...dataset, setUrl, setData};

}

export default useFetch;
