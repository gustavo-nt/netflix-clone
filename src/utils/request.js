const API_KEY = '3d37c9741534f18cbb048ec684ee7d3b';
const API_BASE = 'https://api.themoviedb.org/3';
const API_LANGUAGE = 'pt-BR'

export const typeRequest = async (type, id) => {
    switch(type) {
        case 'movie':
            const movie = await fetch(`${API_BASE}/movie/${id}?api_key=${API_KEY}&language=${API_LANGUAGE}`);
            return movie.json();
        default:
            const season = await fetch(`${API_BASE}/tv/${id}?api_key=${API_KEY}&language=${API_LANGUAGE}`);
            return season.json();
    }
}

export const titleSimilar = async (item) => {
    const similar = await fetch(`${API_BASE}/discover/movie?with_genres=${Math.min(...item.genre_ids)}&language=${API_LANGUAGE}&api_key=${API_KEY}`);
    return similar.json();
}