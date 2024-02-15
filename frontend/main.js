import './style.css'
import { getNotes, getNotesByUserId } from './getNotes.js';
import { getNoteById, updateNoteById } from './editNote.js';
import { deleteNote } from './deleteNote.js';


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
  <div class=logout-btn-wrapper">
    <button id="logout-btn" class="logout-btn">Log Out</button>
  </div>
  <ul id="note-list" class="note-list">
  </ul>
  <h2 id="note-h2">Create New Note</h2>
    <div class="form-wrapper">
    <div class="view" id="view">
      <h3 class="title-text" id="data-title-text">Title</h3>
      <p class="content-text" id="data-content-text">Content</p>
    </div>
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
      <button class="btn" id="button" type="button">Add Note</button>
    </div>
  </div>
`;

const apiURL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async function () {
const noteH2 = document.getElementById('note-h2');
const selectUserElement = document.getElementById('users');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const viewWrapper = document.getElementById('wrapper');
const loginWrapper = document.getElementById('login-wrapper');

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
  
  checkLoggedIn();
});

checkLoggedIn();

logoutBtn.addEventListener('click', function() {
  const loggedIn = localStorage.getItem('user') !== null;
  if (loggedIn) {
    localStorage.removeItem('user');
    location.reload();
  } else {
    return;
  }
});

function checkLoggedIn() {
  const loggedIn = localStorage.getItem('user') !== null;
  console.log(loggedIn);

  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const userId = loggedInUser ? loggedInUser.userId : null;

  if (userId) {
    renderNotes(userId);
    loginWrapper.style.display = 'none';
    viewWrapper.style.display = 'flex';
  } else {
    console.log('User is not logged in!');
    loginWrapper.style.display = 'flex';
    viewWrapper.style.display = 'none';
  }
}

  const form = document.getElementById('note-form');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const userId = JSON.parse(localStorage.getItem('user')).userId;

    const data = {
      title: formData.get('title'),
      text: formData.get('content'),
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
        alert('Note created successfully!');
        form.reset();
        renderNotes(userId);
      } else {
        alert('An error occured when creating note!');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  });

  async function renderNotes(userId) {
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';
    const submitButton = document.getElementById('submit-button');
    const backBtn = document.getElementById('button');
    submitButton.textContent = 'Add Note';
    noteH2.textContent = 'Create New Note';
    backBtn.style.display = 'none';
    submitButton.style.display = 'block';

    backBtn.addEventListener('click', function() {
      location.reload();
    });

    try {
      const userName = await JSON.parse(localStorage.getItem('user')).username;
      const notes = await userName.toLowerCase() === 'admin' ? await getNotes() : await getNotesByUserId(userId);
      //const notes = await getNotesByUserId(userId);

      notes.forEach(note => {
        const li = document.createElement('li');
        li.classList.add('note');
        li.textContent = note.title;

        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group');

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.classList.add('view-button');

        viewButton.addEventListener('click', function () {
          let backBtn = document.getElementById('button');
          let submitBtn = document.getElementById('submit-button');
          backBtn.style.display = 'block';
          submitBtn.style.display = 'none';

          noteH2.textContent = 'View Note';
          backBtn.textContent = 'Close View';

          let formView = document.getElementById('note-form');
          let viewData = document.getElementById('view');

          formView.style.display = 'none';
          viewData.style.display = 'flex';

          let viewDataTitle = document.getElementById('data-title-text');
          let viewDataContent = document.getElementById('data-content-text');

          viewDataTitle.textContent = note.title;
          viewDataContent.textContent = note.text;
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');

        editButton.addEventListener('click', async function() {
          noteH2.textContent = 'Edit Note';
          submitButton.textContent = 'Save';

          const noteById = await getNoteById(note.id);
          const titleInput = document.getElementById('title');
          const textArea = document.getElementById('content');
          if (noteById) {
            titleInput.value = note.title;
            textArea.value = note.text;

            submitButton.addEventListener('click', async function(event) {
              event.preventDefault();

              const updatedData = {
                title: titleInput.value,
                text: textArea.value
              };
              await updateNoteById(note.id, updatedData);
              titleInput.value = '';
              textArea.value = '';
              renderNotes(userId);
            });
          }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', function() {
          deleteNote(note.id);
          renderNotes(userId);
        });

        li.appendChild(btnGroup);
        btnGroup.appendChild(viewButton);
        btnGroup.appendChild(editButton);
        btnGroup.appendChild(deleteButton);

        noteList.appendChild(li);

      });
    } catch (error) {
      console.error('Error: ', error);
    }
  }
});


