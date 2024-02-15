const apiURL = 'http://localhost:3000';

export async function getNoteById(noteId, updatedData) {
    try {
        const response = await fetch(`${apiURL}/note/view/${noteId}`);

        if (response.ok) {
            const note = await response.json();
            return note;
        } else {
            console.error('Failed to get note by ID');
            return null;
        }
    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

export async function updateNoteById(noteId, updatedData) {
    try {
        const response = await fetch(`${apiURL}/note/edit/${noteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            console.log('Note updated successfully');
        } else {
            console.error('Failed to update note');
        }
    } catch (error) {
        console.error(error);
    }
}

