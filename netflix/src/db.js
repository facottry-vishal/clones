// db.js
const API_KEY = 'd851ead6';
const API_BASE = 'http://www.omdbapi.com/';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}&apikey=${API_KEY}`);
    const json = await req.json();
    return json;
};

const transformItem = (item) => ({
    poster: item.Poster,
    title: item.Title,
    type: item.Type,
    year: item.Year,
    imdbID: item.imdbID,
    genre: item.Genre,
    imdbVotes: item.imdbVotes,
    Country: item.Country,
    Actors: item.Actors,
    Plot: item.Plot,
});

const fetchDetailedInfo = async (imdbID) => {
    const data = await basicFetch(`?i=${imdbID}`);
    return transformItem(data);
};

export default {
    getHomeList: async () => {
        const categories = [
            { slug: 'originals', title: 'Netflix Originals', search: 'movie', type: 'series' },
            { slug: 'sci-fi', title: 'Sci-Fi', search: 'series', type: 'series' },
            { slug: 'fantasy', title: 'Fantasy', search: 'fantasy', type: 'movie' },
            { slug: 'action', title: 'Action', search: 'action', type: 'movie' },
            { slug: 'comedy', title: 'Comedy', search: 'comedy', type: 'movie' },
            { slug: 'horror', title: 'Horror', search: 'horror', type: 'movie' },
            { slug: 'romance', title: 'Romance', search: 'romance', type: 'movie' },
            { slug: 'documentary', title: 'Documentaries', search: 'documentary', type: 'movie' },
        ];

        const promises = categories.map(async (category) => {
            const data = await basicFetch(`?s=${category.search}&type=${category.type}`);
            const detailedItemsPromises = data.Search.map(async (item) => await fetchDetailedInfo(item.imdbID));
            const detailedItems = await Promise.all(detailedItemsPromises);

            return {
                slug: category.slug,
                title: category.title,
                items: detailedItems
            };
        });

        return Promise.all(promises);
    },
    getMovieInfo: async (movieId, type) => {
        if (!movieId) return null;

        const data = await basicFetch(`?i=${movieId}&type=${type}`);
        return transformItem(data);
    }
};
