//VARIABLES 
const searchContainer = document.getElementsByClassName('search-container')[0];
const gallery = document.getElementsByClassName('gallery')[0];
const randomUserAPI = `https://randomuser.me/api/?results=12&nat=US`;
let employeeCards = '';

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
  .then(data => {
    createGallery(data.results);
    createModals(data.results);
    employeeCards = document.getElementsByClassName('card');
    
  })

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

//Create modals
function createModals(array) {
  const modalsHTML = array.map(employee => `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.cell}</p>
            <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${employee.dob.date}</p>
          </div>
      </div>
    </div>
  `);
}

//Show modal
// if (card name === name) {
//   show modal-container where name === name
// }

//Listen for clicks on employees

// document.addEventListener('click', (event) => {
//   if (event.target.className.includes('card')) {
//     //showModal();
//   }
// })

