const apiURL = 'http://localhost:3000';

export async function getNotes() {
    try {
        const response = await fetch(`${apiURL}/notes`);
        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

export async function getNotesByUserId(id) {
    try {
        const response = await fetch(`${apiURL}/notes/user/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

