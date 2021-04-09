//VARIABLES 
const searchContainer = document.getElementsByClassName('search-container')[0];
const gallery = document.getElementsByClassName('gallery')[0];
const randomUserAPI = `https://randomuser.me/api/?results=12`;
const totalEmployees = 12;


//Add search element
const searchHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
`;
searchContainer.insertAdjacentHTML('beforeend', searchHTML);

//Get employee info 
fetch(randomUserAPI)
  .then(response => response.json())
  .then(data => createGallery(data.results))

//Create gallery
function createGallery(array) {
  const galleryHTML = array.map(employee => `
      <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
      </div>
    `);
  gallery.insertAdjacentHTML('beforeend', galleryHTML);
}