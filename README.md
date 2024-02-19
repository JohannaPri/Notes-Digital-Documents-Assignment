# Notes - Create Digital Documents!

### This project is made as an assignment in the API-development course.

**This project is built as a prototype for a "client"**

### How to run this project:

You will need to have access to a MySQL database to be able to try this project.

**In folder "frontend":**
- Open terminal and do:
    - npm install
    - npm run dev

**In folder "backend":**
- Open terminal and do:
    - npm install
    - npm start (nodemon start) 

### How to use Notes and create digital documents

I have built Notes based on the headless principle. I have been working with both backend and frontend. 

If you want to visit Notes and try it out and create a few digital documents you can follow the instructions above. 

You can also create documents by using the EndPoints that you find in the backend folder. You can use following programs to try them out: 

- Postman
- REST Client in Visual Studio Code

--- 

### Sign-In:

I have created two objects with two different users: Admin and Johanna. These two objects contain username and userId.

Then, I have a list where I select users. Based on the user I choose, the username and userId are retrieved from the object for that user and then saved in localStorage.

  ``` 
    const users = {
    admin: {
      userId: 'aa77f32b-9ead-4b5e-ae20-2867423cf2ad',
      username: 'Admin'
    },
    johanna: {
      userId: '6ca9c7a4-11da-4962-9fbb-172ea5a5aef1',
      username: 'Johanna'
    }
  };
  ```

#### Usage of sign-in object:

I then retrieve the userId from localStorage when, for example, "Create New Post", as it is a requirement in my body that userId should be included (title, text, userId):

```
{
  "title": "title for the note",
  "text": "the text in the note",
  "userId": "userId from localStorage depending on which user you chose in the list at sign-in"
} 
```

---

## Content

I have during this assignment been using following components:

- Express installation 
- Node.js
- MAMP 
- PhpMyAdmin (MAMP tools - database)
- Vanilla JavaScript
- Vite
- CSS
- Postman

--- 

## API - documentation 

Below you can see the EndPoints that are used to create Notes:

- `GET /notes`: Retrieve all documents that are created. 

- `GET /notes/user/:id`: Retrieve all documents created by a specifik user. 

- `POST /notes/add`: Create new documents.

- `GET /note/view/:id`: View a specific document, by using that document's ID. 

- `PATCH /note/edit/:id`: Edit a specific document, by using that document's ID. 

- `DELETE /note/delete/:id`: Delete a specifik document by using it's ID. 

---

## CRUD 

- **Create (POST /notes/add):**

    - This route handles the creation of a new note. It accepts a POST request with the note's title, text, and userId in the request body. It inserts a new record into the database table for notes.

- **Read (GET /notes, GET /notes/user/:id, GET /note/view/:id):**

    - These routes handle reading or retrieving notes from the database.
        - /notes retrieves all notes that are not deleted.
        - /notes/user/:id retrieves notes belonging to a specific user.
        - /note/view/:id retrieves a specific note by its ID.

- **Update (PATCH /note/edit/:id):**

    - This route handles updating an existing note. It accepts a PATCH request with the ID of the note to be updated in the URL parameter and the new title and text in the request body. It updates the corresponding record in the database with the new data.

- **Delete (DELETE /note/delete/:id):**

    - This route handles deleting a note. It accepts a DELETE request with the ID of the note to be deleted in the URL parameter. It marks the corresponding record in the database as deleted.

### Why Notes?

Notes is built to be a website that makes it easy and simple to create digital document's online, but it's also meant to be for everyone to use. 
 

Notes is there for you, for whatever you need it to be. It might be to remember your shopping list or to brainstorm or to just write down whats on your mind. 

#### Your Digital Documents Will Always Be With You!

### How does Notes work?

- **This is only a prototype so there for it's only two different users for now.**

    - you can choose to log in as Admin or as Johanna. If you sign in as Admin you can see all created documents between the two users. 
    
    - But if you sign in as Johanna you can only see the documents that are created in that account.

    - When signed in you are free to look around, explore and create documents.

- **You will find everything you need as soon as you are logged in.**

    - On the top of the page you will see a heading that says **My Notes**.

    - Under **My Notes** you will find the log-out button. if you press that one you will be logged out and get back to the log in view. 

    - But you will also find all documents you have created or will create under **My Notes** heading. 
    the documents will line up as a list. 

    - Under the list You will see a heading that says **Create New Note**, under that you have the form. All documents needs to have a Title and Text content for it to be created. 

    - When you have put in a title and some content you will press the button **Add Note**, when pressing the button, your document will be added to the list above the form. 

- **When you see your document in the list (you will se the title that you choosed) you will also see three different buttons on the side of the title.**

    - The first button is called **view** if you press that one you will se your document in reading mode. It will appear in the same place as you created the document. When you are done you press **Close View** and the heading, **Create New Note** will appear again and you will be able to create another document. 
    **Good to know:** You won't be able to see the list with all your created documents when in view mode.

    - The next button is **Edit** if you press this button you will end up in edit mode. Here you can change your title or your content or both. When done you press **Save Edit** and your changes will be saved and you will now see your new title in the list. 
    
    - You will also see a button that says **Close Edit** above the **Save Edit** button, that's if you changed your mind and don't want to edit and just want to close edit mode. 
     **Good to know:** You won't be able to see the list with all your created documents when in view mode.

    - The last button is **Delete** if you press this button, your document will be removed, and you won't see it in your list anymore. 

    - **Remember, that it's not possible to create a new document without Title and Content. It's the same with Edit you can't press edit and remove title and content and then Save Edit. That won't work and your document will not be created/saved**

---

##### I hope you find Notes as easy and simple to create digital documents as I do! 

### Thanks for checking out my prototye. Hopefully Notes will be of use to you!



 







