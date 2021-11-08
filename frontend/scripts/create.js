
function submitForm(e, form) {
  e.preventDefault();

  fetch("http://localhost:3000/points/create", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    //credentials: "include",
    //credentials: "same-origin",
    body: JSON.stringify({
      name: form.name.value,
      type: form.type.value,
      country: form.country.value,
      region: form.region.value,
      lon: form.lon.value,
      lat: form.lat.value,
      description: form.description.value,
      recommendations: form.recommendations.value,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let message = document.getElementById("createMes");
    message.className = "bg-danger";
    message.className += " p-3";
    message.className += " mb-2";
    message.className += " text-white";
    message.innerHTML = data.message;
  })
    .catch((error) => error);
}
