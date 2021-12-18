//Error message display
function displayMessage(mes){
    let message = document.getElementById("createMes");
    message.className = "bg-danger";
    message.className += " p-3";
    message.className += " mb-2";
    message.className += " text-white";
    message.innerHTML = mes;
    setTimeout(()=>{
       message.innerHTML = '';
       message.className = '';}, 3000);
}

//Leaflet functionality

var mymap = L.map("map").setView([51.505, -0.09], 3);
//var markers = [];
var markersLayer = new L.LayerGroup();
mymap.on("click", createPOI);

//creating new point of interest on the map
function createPOI(e) {
  let popup = L.popup();
  let latlng = mymap.mouseEventToLatLng(e.originalEvent);
  //console.log(latlng);
  let form = `<form method="post" onsubmit="createForm(event, this)">
    <div class="form-group">
      <label for="name">Please enter name</label>
      <input
        type="text"
        name="name"
        class="form-control"
        id="name"
      />
    </div>
    <div class="form-group">
      <label for="type">Please enter type</label>
      <input
        type="text"
        name="type"
        class="form-control"
        id="type"
      />
    </div>
    <div class="form-group">
        <label for="country">Please enter country</label>
        <input
          type="text"
          name="country"
          class="form-control"
          id="country"
        />
      </div>
      <div class="form-group">
        <label for="region">Please enter region</label>
        <input
          type="text"
          name="region"
          class="form-control"
          id="region"
        />
      </div>
      <div class="form-group">
        <label for="longitude">Please enter longitude</label>
        <input
          type="text"
          name="lon"
          class="form-control"
          id="longitude"
          value=${latlng.lng}
        />
      </div>
      <div class="form-group">
        <label for="latitude">Please enter latitude</label>
        <input
          type="text"
          name="lat"
          class="form-control"
          id="latitude"
          value=${latlng.lat}
        />
      </div>
      <div class="form-group">
        <label for="description">Please enter description</label>
        <input
          type="text"
          name="description"
          class="form-control"
          id="description"
        />
      </div>
      <div class="form-group">
        <label for="recommendations">Please enter recommendations</label>
        <input
          type="number"
          name="recommendations"
          class="form-control"
          id="recommendations"
        />
      </div>
      <br>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`;

  popup.setLatLng(latlng).setContent(form).openOn(mymap);
}

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
  }
).addTo(mymap);


//search by region
function getByRegion(region) {
  fetch(`http://localhost:3000/points/${region}`)
    .then((response) => response.json())
    .then((json) => {
      if(json.message){
        displayMessage(json.message);
      }

      console.log(json);
      let resultsTable = document.getElementById("results");
      resultsTable.innerHTML = "";

      markersLayer.clearLayers();
      let marker;
      

      //Create result table
      for (let item of json) {
        let review = item["review"]?item["review"]:"No review yet";
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML += item["name"];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML += item["type"];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML += item["country"];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML += item["region"];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML += item["lon"];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML += item["lat"];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML += item["description"];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML += item["recommendations"];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML += review;
        tr.appendChild(td);
        td = document.createElement("td");
        btn = document.createElement("button");
        btn.innerHTML = "Recommend";
        btn.addEventListener("click", function () {
          fetch(`http://localhost:3000/points/recommend/${item["ID"]}`, {
            method: "PUT",
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              displayMessage(data.message);
            })
            .catch((error) => error);
        });
        td.appendChild(btn);
        tr.appendChild(td);
        resultsTable.appendChild(tr);

        
        var popup = L.popup().setContent(
          `<h3>${item["name"]}</h3>
          <p>${item["description"]}</p>
          <h6>Reviews</h6>
          <p>${review}</p>
          <form method="post" onsubmit="submitReview(event, this, ${item["ID"]})">
          <h6>Enter a review</h6><br>
          <textarea name="review"></textarea><br>
          <button type="submit" class="btn btn-primary">Add review</button>
          </form>
          `
        );

        marker = L.marker([item["lat"], item["lon"]]).bindPopup(popup, {
          showOnMouseOver: true,
        });
        markersLayer.addLayer(marker);
        markersLayer.addTo(mymap);
      }
    })
    .catch((error) => error);
}


document.getElementById("regBtn").addEventListener("click", () => {
  const region = document.getElementById("region").value;
  getByRegion(region);
});

//logging out functionality
document.getElementById("logout").addEventListener("click", () => {
  fetch(`http://localhost:3000/auth/logout`, {
            method: "GET",
            credentials: 'include',
            //credentials: "same-origin",
          })
            .then((response) => response.json())
            .then((text) => {
              console.log(text);
              displayMessage(text.message);
            })
            .catch((error) => error);
  });


//creating review
function submitReview(e, form, id) {
  e.preventDefault();

  fetch("http://localhost:3000/reviews/create", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    //credentials: "same-origin",
    body: JSON.stringify({
      review: form.review.value,
      poiid: id
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    displayMessage(data.message);
  })
    .catch((error) => error);;
}

//creating new point of interest
function createForm(e, form) {
  e.preventDefault();

  fetch("http://localhost:3000/points/create", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    //credentials: "same-origin",
    body: JSON.stringify({
      name: form.name.value,
      type: form.type.value,
      country: form.country.value,
      region: form.region.value,
      lon: form.lon.value,
      lat: form.lat.value,
      description: form.description.value,
      recommendations: form.recommendations.value
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    displayMessage(data.message);
  })
    .catch((error) => error);;
}

//logging in functionality
function loginForm(e, form){
  e.preventDefault();
  
  fetch('http://localhost:3000/auth/login', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    //credentials: "same-origin",
    body: JSON.stringify({username: form.username.value, password: form.password.value})
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
    displayMessage(data.message);
  })
    .catch((error) => error);
}
