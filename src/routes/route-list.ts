export const ROUTES = {
    searchResults: '/search',
    coinDetail: {
        path: '/coin/:id',
        link: (id: string) => `/coin/${id}` 
    }
}
