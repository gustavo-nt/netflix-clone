export const formatTime = (value) => {
    const hours = Math.trunc(value / 60);
    const minutes = value % 60;

    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
}

export const formatFullYear = (value) => {
    const firstDate = new Date(value);
    return firstDate.getFullYear();
}

export const formatGenres = (value) => {
    const arr = [];

    for (let i in value) {
        arr.push(value[i].name);
    }  

    return arr;
}

export const formatComanies = (value) => {
    const arr = [];

    for (let i in value) {
        arr.push(value[i].name);
    }

    if (arr.join(', ').length > 50) {
        return arr.join(', ').substring(0, 50) + '...';
    } else {
        return arr.join(', ');
    }
}

export const formatStatus = (value) => {
    let status;

    switch (value.toLowerCase()) {
        case 'returning series':
            status = 'Renovada';
            break;
        case 'released':
            status = 'Lançado'
            break;
        case 'ended': 
            status = 'Finalizada';
            break;
        default:
            status = 'Não definido'
    }

    return status;
}