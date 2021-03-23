const API_KEY = '3d37c9741534f18cbb048ec684ee7d3b';
const API_BASE = 'https://api.themoviedb.org/3';
const API_LANGUAGE = 'pt-BR'

const basicFecth = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();

    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFecth(`/discover/tv?with_networks=213&language=${API_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFecth(`/trending/all/week?&language=${API_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFecth(`/movie/top_rated?&language=${API_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'Action',
                title: 'Ação',
                items: await basicFecth(`/discover/movie?with_genres=28&language=${API_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'commedy',
                title: 'Comédia',
                items: await basicFecth(`/discover/movie?with_genres=35&language=${API_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFecth(`/discover/movie?with_genres=27&language=${API_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFecth(`/discover/movie?with_genres=10749&language=${API_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFecth(`/discover/movie?with_genres=99&language=${API_LANGUAGE}&api_key=${API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        var info = {};

        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFecth(`/movie/${movieId}?language=${API_LANGUAGE}&api_key=${API_KEY}`)
                break;
                case 'tv': 
                    info = await basicFecth(`/tv/${movieId}?language=${API_LANGUAGE}&api_key=${API_KEY}`)
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}