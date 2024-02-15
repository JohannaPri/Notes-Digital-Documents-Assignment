const apiURL = 'http://localhost:3000';

export async function deleteNote(noteId) {
    try {
        const response = await fetch(`${apiURL}/note/delete/${noteId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Note deleted successfully!');
        } else {
            console.error('Failed to delete note');
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}