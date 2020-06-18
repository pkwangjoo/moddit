const initialState = {
    marketplaces: [],
    marketplace: null,
    loading: true,
    error: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'GET_MARKETPLACES':
            return {
                ...state,
                marketplaces: payload,
                marketplace: null,
                loading: false,
            };

        case 'CREATE_MARKETPLACE':
            return {
                ...state,
                marketplaces: [...state.marketplaces, payload],
                loading: false
            };

        default:
            return state;
    }
}
