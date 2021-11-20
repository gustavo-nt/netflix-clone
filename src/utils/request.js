export const typeRequest = async (type, id) => {
    switch(type) {
        case 'movie':
            const movie = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_BASE}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${process.env.NEXT_PUBLIC_TMDB_API_LANGUAGE}`);
            return movie.json();
        default:
            const season = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_BASE}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${process.env.NEXT_PUBLIC_TMDB_API_LANGUAGE}`);
            return season.json();
    }
}

export const titleSimilar = async (item) => {
    const similar = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_BASE}/discover/movie?with_genres=${Math.min(...item.genre_ids)}&language=${process.env.NEXT_PUBLIC_TMDB_API_LANGUAGE}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    return similar.json();
}