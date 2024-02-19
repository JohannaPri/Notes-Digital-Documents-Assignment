// Import CSS and necessary modules
import './style.css'
import { getNotes, getNotesByUserId } from './getNotes.js';
import { getNoteById, updateNoteById } from './editNote.js';
import { deleteNote } from './deleteNote.js';

// HTML structure
document.querySelector('#app').innerHTML = `
<div class="login-wrapper" id="login-wrapper">
  <div class="user-dropdown">
    <select name="users" id="users"> 
      <option value="admin">Admin</option>
      <option value="johanna">Johanna</option>
    </select>
  </div>
  <div class="login" id="login">
    <button id="login-btn" class="login-btn">Sign In</button>
  </div>
</div>
  <div class="wrapper" id="wrapper">
  <h1>My Notes</h1>
  <div class="logout-btn-wrapper">
    <button id="logout-btn" class="logout-btn">Log Out</button>
  </div>
  <ul id="note-list" class="note-list">
  </ul>

  <h2 id="note-h2">Create New Note</h2>

    <div class="form-wrapper">

      <div id="render-create">
        <form id="note-form">
          <label id="label-title" for="title">Title:</label>
          <br>
          <input class="title" type="text" id="title" name="title" maxlength="25">
          <p id="max-length-text" class="small-text">(maxlength 25)</p>
          <br>
          <br>
          <label id="label-content" for="content">Content:</label>
          <br>
          <textarea class="textarea" id="content" name="content"></textarea>
          <br>
          <button class="submit-btn" id="submit-button" type="submit">Add Note</button>
        </form>
      </div>
  
  
      <div id="render-view">
        <div class="view" id="view">
        <h3 class="title-text" id="data-title-text">Title</h3>
        <p class="content-text" id="data-content-text">Content</p>
        <button class="btn" id="close-button-view" type="button">Close View</button>
        </div>
      </div>
  
      <div id="render-edit">
        <div class="edit" id="edit">
          <label id="label-title" for="title">Title:</label>
          <br>
          <input class="title" type="text" id="edit-title" name="title" maxlength="25">
          <p id="max-length-text" class="small-text">(maxlength 25)</p>
          <br>
          <br>
          <label id="label-content" for="content">Content:</label>
          <br>
          <pre><textarea class="textarea" id="edit-content" name="content"></textarea></pre>
          <br>
          <button class="btn" id="close-button-edit" type="button">Close Edit</button>
          <button class="btn" id="save-button" type="button">Save Edit</button>
        </div>
      </div>
    </div>
  </div>
`;

// API URL
const apiURL = 'http://localhost:3000';

// Event listeners
document.addEventListener('DOMContentLoaded', async function () {
  // Element references
  const noteH2 = document.getElementById('note-h2');
  const selectUserElement = document.getElementById('users');
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const viewWrapper = document.getElementById('wrapper');
  const loginWrapper = document.getElementById('login-wrapper');

  // Sign-in button click event
  loginBtn.addEventListener('click', function() {
    const admin = {
      userId: 'aa77f32b-9ead-4b5e-ae20-2867423cf2ad',
      username: 'Admin'
    }

    const johanna = {
      userId: '6ca9c7a4-11da-4962-9fbb-172ea5a5aef1',
      username: 'Johanna'
    }

    const selectedUser = selectUserElement.value;
    if (selectedUser === 'admin') {
      localStorage.setItem('user', JSON.stringify(admin));
    } else {
      localStorage.setItem('user', JSON.stringify(johanna));
    }

    checkLoggedIn(); // Check login status
  });

  checkLoggedIn(); // Check login status

  // Logout button click event
  logoutBtn.addEventListener('click', function() {
    const loggedIn = localStorage.getItem('user') !== null;
    if (loggedIn) {
      localStorage.removeItem('user');
      location.reload(); // Reload the page after logout
    } else {
      return;
    }
  });

  // Function to check login status
  function checkLoggedIn() {
    const loggedIn = localStorage.getItem('user') !== null;
    console.log(loggedIn);

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const userId = loggedInUser ? loggedInUser.userId : null;

    if (userId) {
      renderNotes(userId); // Render notes if logged in
      loginWrapper.style.display = 'none';
      viewWrapper.style.display = 'flex';
      focusCreate();
    } else {
      console.log('User is not logged in!');
      loginWrapper.style.display = 'flex';
      viewWrapper.style.display = 'none';
    }
  }

  // Form submission event // CREATE
  const form = document.getElementById('note-form');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const dataTitle = formData.get('title').trim();
    const dataContent = formData.get('content').trim();

    if (dataTitle.length === 0 || dataContent.length === 0) {
        console.log('Title and/or content cannot be empty!');
        return;
    }

    const data = {
      title: dataTitle,
      text: dataContent,
      userId: userId
    };

    try {
      const response = await fetch(`${apiURL}/notes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Note created successfully!');
        form.reset();
        renderNotes(userId);
      } else {
        console.log('An error occurred when creating note!');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  });

  async function renderNotes(userId) {
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';

    try {
      const userName = await JSON.parse(localStorage.getItem('user')).username;
      const notes = await userName.toLowerCase() === 'admin' ? await getNotes() : await getNotesByUserId(userId);
      
      // Loop through notes
      notes.forEach(note => {
        const li = document.createElement('li');
        li.classList.add('note');
        li.textContent = note.title;

        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group');

        // View Button
        let viewButton = document.createElement('button');

        viewButton.textContent = 'View';
        viewButton.classList.add('view-button');
        viewButton.addEventListener('click', function () {
          noteH2.textContent = 'View Note';
          focusView(note);
        });
        
        // Edit Button
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', async function() {
          noteH2.textContent = 'Edit Note';

          const noteById = await getNoteById(note.id);
          let titleInput = document.getElementById('title');
          let textArea = document.getElementById('content');

          if(noteById) {
            titleInput.value = note.title;
            textArea.value = note.text;
          }

          focusEdit(note, userId);
        });

        // Delete Button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', async function() {
          await deleteNote(note.id);
          renderNotes(userId);
        });

          li.appendChild(btnGroup);
          btnGroup.appendChild(viewButton);
          btnGroup.appendChild(editButton);
          btnGroup.appendChild(deleteButton);

          noteList.appendChild(li);
      });

    } catch(error) {
      console.error('Error: ', error);
    }
  }

  //View
  async function focusView(note) {
    let displayView = document.getElementById('render-view');
    let displayCreate = document.getElementById('render-create');
    let displayEdit = document.getElementById('render-edit');

    let closeButtonView = document.getElementById('close-button-view');
    let closeButtonEdit = document.getElementById('close-button-edit');
    let submitButton = document.getElementById('submit-button');
    let saveButton = document.getElementById('save-button');

    let noteList = document.getElementById('note-list');
    noteList.style.display = 'none';

    displayView.style.display = 'block';
    displayCreate.style.display = 'none';
    displayEdit.style.display = 'none';

    closeButtonView.style.display = 'block';
    closeButtonEdit.style.display = 'none';
    submitButton.style.display = 'none';
    saveButton.style.display = 'none';

    let viewDataTitle = document.getElementById('data-title-text');
    let viewDataContent = document.getElementById('data-content-text');

    let viewData = document.getElementById('view');
    viewData.style.display = 'block';

    viewDataTitle.textContent = note.title;
    viewDataContent.textContent = note.text;

    closeButtonView.addEventListener('click', function() {
      noteH2.textContent = 'Create New Note';
      viewDataTitle.value = '';
      viewDataContent.value = '';
      focusCreate();
    });
  }

  //Create
  async function focusCreate() {
    let noteList = document.getElementById('note-list');
    noteList.style.display = 'block';

    let displayView = document.getElementById('render-view');
    let displayCreate = document.getElementById('render-create');
    let displayEdit = document.getElementById('render-edit');

    let closeButtonView = document.getElementById('close-button-view');
    let closeButtonEdit = document.getElementById('close-button-edit');
    let submitButton = document.getElementById('submit-button');
    let saveButton = document.getElementById('save-button');

    displayView.style.display = 'none';
    displayCreate.style.display = 'block';
    displayEdit.style.display = 'none';

    closeButtonView.style.display = 'none';
    closeButtonEdit.style.display = 'none';
    submitButton.style.display = 'block';
    saveButton.style.display = 'none';
    
    let formView = document.getElementById('note-form');
    formView.style.display = 'block';
  }

  //Edit
  async function focusEdit(note, userId) {
    console.log('NOTE: ', note.title);
    let displayView = document.getElementById('render-view');
    let displayCreate = document.getElementById('render-create');
    let displayEdit = document.getElementById('render-edit');

    let closeButtonView = document.getElementById('close-button-view');
    let closeButtonEdit = document.getElementById('close-button-edit');
    let submitButton = document.getElementById('submit-button');
    let saveButton = document.getElementById('save-button');

    let noteList = document.getElementById('note-list');
    noteList.style.display = 'none';

    displayView.style.display = 'none';
    displayCreate.style.display = 'none';
    displayEdit.style.display = 'block';

    closeButtonView.style.display = 'none';
    closeButtonEdit.style.display = 'block';
    submitButton.style.display = 'none';
    saveButton.style.display = 'block';

    const noteById = await getNoteById(note.id);
    const editTitle = document.getElementById('edit-title');
    const editContent = document.getElementById('edit-content');

    editTitle.value = note.title;
    editContent.value = note.text;

    if (noteById) {
      saveButton.addEventListener('click', async function() {
        const updatedData = {
          title: editTitle.value,
          text: editContent.value
        };
        console.log(updatedData.title.length);
        console.log(updatedData.text.length);
        if (updatedData.title.length === 0 || updatedData.text.length === 0) {
          console.log('Title and/or content cannot be empty!');
          return;
      }
        await updateNoteById(note.id, updatedData);
        editTitle.value = '';
        editContent.value = '';
        await renderNotes(userId);
        location.reload();
      });
    }
    closeButtonEdit.addEventListener('click', async function() {
      noteH2.textContent = 'Create New Note';
      await focusCreate();
      editTitle.value = '';
      editContent.value = '';
      await renderNotes(userId);
      location.reload();
    });
  }
});
