import axios from 'axios';

export const getMarketplaces = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/marketplace');

        dispatch({
            type: "GET_MARKETPLACES",
            payload: res.data,
        });
    } catch (err) {
        // dispatch({
        //     type: "MARKETPLACE_ERROR",
        //     payload: { msg: err.response.statusText, status: err.respsonse.status },
        // });
        console.log("error");
    }
};

export const createMarketplace = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const res = await axios.post("/api/marketplace", formData, config);

        

        dispatch({
            type: "CREATE_MARKETPLACE",
            payload: res.data,
        });

        history.push("/marketplace");

    } catch (err) {
        console.log("error");
    }
}
