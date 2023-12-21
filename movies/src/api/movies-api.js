export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({username: username, password: password})
    });
    return response.json();
};
export const loginByGoogle = async (username, email, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=googleLogin', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({username: username, email: email, password: password})
    });
    return response.json();
};

export const signup = async (username, password, email) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({username: username, password: password, email: email})
    });
    return response.json();
};
export const addToPlaylist = async (userId, movieId) => {
    console.log(userId, movieId);
    const response = await fetch(`http://localhost:8080/api/users/playlist/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({movieId: movieId})
    });
    if (!response.ok) {
        throw new Error('Could not add to playlist');
    }
    return response.json();
};
export const removeFromPlaylist = async (userId, movieId) => {
    const response = await fetch(`http://localhost:8080/api/users/playlist/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({movieId: movieId})
    });
    if (!response.ok) {
        throw new Error('Could not remove from playlist');
    }
    return response.json();
}
export const getPlaylist = async (userId) => {
    const response = await fetch(`http://localhost:8080/api/users/playlist/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Could not get playlist');
    }
    return response.json();
}

export const addToFavourites = async (userId, movieId) => {
    console.log(userId, movieId);
    const response = await fetch(`http://localhost:8080/api/users/favourites/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({movieId: movieId})
    });
    if (!response.ok) {
        throw new Error('Could not add to Favourites');
    }
    return response.json();
};
export const removeFromFavourites = async (userId, movieId) => {
    const response = await fetch(`http://localhost:8080/api/users/favourites/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({movieId: movieId})
    });
    if (!response.ok) {
        throw new Error('Could not remove from Favourites');
    }
    return response.json();
}
export const getFavourites = async (userId) => {
    const response = await fetch(`http://localhost:8080/api/users/favourites/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Could not get Favourites');
    }
    return response.json();
}