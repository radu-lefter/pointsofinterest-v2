
// $("#loginForm").submit(function(e) {

//     e.preventDefault();
  
//     var form = $(this);
//     // var url = form.attr('action');
    
//     $.ajax({
//            type: "post",
//            url: "http://localhost:5000/pois/login",
//            //xhrFields: { withCredentials:true },
//            data: form.serialize(), // serializes the form's elements.
//            success: function(data)
//            {
//                console.log(data); 
              
//             }
//     });
  
//   });


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