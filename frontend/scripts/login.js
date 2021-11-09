

  function submitForm(e, form){
    e.preventDefault();
    
    fetch('http://localhost:3000/auth/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      //credentials: 'include',
      //credentials: "same-origin",
      body: JSON.stringify({username: form.username.value, password: form.password.value})
    }).then((response) => response.json())
    .then((data) => {
      console.log(data);
      
    })
      .catch((error) => error);
}