//VARIABLES 
const searchContainer = document.getElementsByClassName('search-container')[0];
const gallery = document.getElementsByClassName('gallery')[0];
const randomUserAPI = `https://randomuser.me/api/?results=12&nat=US`;
const modalDiv = document.createElement('div');
modalDiv.className = 'modal-container';
modalDiv.style.display = 'none';
let employeeData = [];

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
    employeeData = data.results;
    createGallery(employeeData);
    showModal(employeeData);
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
  `).join('');
  gallery.insertAdjacentHTML('beforeend', galleryHTML);
}

//Create modals
function createModal(employee) {
  //show the hidden modal div
  modalDiv.style.display = 'flex';

  //format the employee's birthday
  let bday = new Date(employee.dob.date);
  let formattedBday = `${(bday.getMonth() + 1)}/${bday.getDate()}/${bday.getFullYear()}`;

  //Function to replace dash in phone number with a space
  //Found via google search here: http://www.openjs.com/scripts/strings/setcharat_function.php
  function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
  }

  //format the employee's phone number using function above 
  let cell = `${employee.cell}`;
  formattedCell = setCharAt(cell, 5, ' ');

  //create modal HTML with employee info
  const modalHTML = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="modal-text">${employee.email}</p>
          <p class="modal-text cap">${employee.location.city}</p>
          <hr>
          <p class="modal-text">${formattedCell}</p>
          <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, 
              ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
          <p class="modal-text">Birthday: ${formattedBday}</p>
        </div>
    </div>
  `;

  //Add the html to the modal div and then add that div as an element directly after the gallery
  modalDiv.innerHTML =modalHTML;
  gallery.insertAdjacentElement('afterend', modalDiv);

  //Listen for clicks to close modal
  document.getElementById('modal-close-btn').addEventListener('click', () => {
    modalDiv.style.display = 'none';
  });

}


//Show modal function
function showModal(array) {
  for (let i = 0; i < gallery.children.length; i++) {
    gallery.children[i].addEventListener('click', (event) => {
      createModal(array[i]);
    });
  }
}

//Search function
function search(text) {
  gallery.innerHTML = '';
  let searchResults = [];
  employeeData.forEach(employee => {
    let name = `${employee.name.first} ${employee.name.last}`;
    let lowerCaseName = name.toLowerCase();
    let lowerCaseSearch = text.toLowerCase();
    if (lowerCaseName.includes(lowerCaseSearch)) {
      searchResults.push(employee);
    }
  });
  createGallery(searchResults);
  showModal(searchResults)
}


//Listen for searches
document.getElementById('search-input').addEventListener('keyup', (event) => {
  search(event.target.value);
});