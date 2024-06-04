
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"

document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('userPassword').value;
        
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response =>{
            console.log("Response: ", response);
             return response.json();
        })      
        .then(data => {
            console.log("Data: ", data);
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            } else {
                alert('Identifiants incorrects, veuillez réessayer.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur est survenue, veuillez réessayer plus tard.');
        });
    });
});