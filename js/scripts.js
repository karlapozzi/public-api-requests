//VARIABLES 
//DOM elements I need to point to 
const searchContainer = document.getElementsByClassName('search-container')[0];
const gallery = document.getElementsByClassName('gallery')[0];
const randomUserAPI = `https://randomuser.me/api/?results=12&nat=US`; //12 results + US format so search works
//Create a div for the modal
const modalDiv = document.createElement('div');
modalDiv.className = 'modal-container';
modalDiv.style.display = 'none';
//A placeholder for the data that will be returned 
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
  //Convert data to JSON
  .then(response => response.json())
  .then(data => {
    //Save data in array so it can be used other places
    employeeData = data.results;
    //Create initial gallery of employees
    createGallery(employeeData);
    //Add event listeners to the gallery elements, using the same array, so corresponding modal shows when clicked 
    showModal(employeeData);
  })
  //Handle errors
  .catch (error => alert(
    `There was a problem getting Employee data:
    ${error}.
      
    Please try again later.`
    ))


//Create gallery
function createGallery(array) {
  //Creates HTML gallery elements
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

//Show modal function
function showModal(array) {
  for (let i = 0; i < gallery.children.length; i++) {
    //Add event listener to each gallery element 
    gallery.children[i].addEventListener('click', () => {
      //Create corresponding modal when gallery item is clicked 
      createModal(array[i], i, array);
    });

  }
}

//Create modal (called in the showModal function)
function createModal(employee, i, array) {
  //show the hidden modal div
  modalDiv.style.display = 'flex';

  //format the employee's birthday
  let bday = new Date(employee.dob.date);
  let formattedBday = `${(bday.getMonth() + 1)}/${bday.getDate()}/${bday.getFullYear()}`;

  //Format the employee's phone number 
  //Adapted code from this source: http://www.openjs.com/scripts/strings/setcharat_function.php
  let cell = `${employee.cell}`;
  formattedCell = cell.substring(0,5) + ' ' + cell.substring(6); //separates the default cell into 2 strings with a space between

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
        <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
  `;

  //Add the html to the modal div and then add that div as an element directly after the gallery
  modalDiv.innerHTML =modalHTML;
  gallery.insertAdjacentElement('afterend', modalDiv);

  //Hide previous button if the first employee is shown 
  if (i === 0){
    document.getElementById('modal-prev').disabled = true;
  } else {
    document.getElementById('modal-prev').disabled = false;
  }
  //Hide next button if the last employee is shown
  if (i === (array.length - 1)){
    document.getElementById('modal-next').disabled = true;
  } else {
    document.getElementById('modal-next').disabled = false;
  }

  //Listen for clicks to close the modal
  document.getElementById('modal-close-btn').addEventListener('click', () => {
    modalDiv.style.display = 'none';
  });

  //Listen for clicks on previous modal button
  document.getElementById('modal-prev').addEventListener('click', () => {
    createModal(array[i-1], (i-1), array);
  });
  
  //Listen for clicks on the next modal button
  document.getElementById('modal-next').addEventListener('click', () => {
    createModal(array[i+1], (i+1), array);
  });

}


//Search function
function search(text) {
  //Clear the current displayed gallery of employees
  gallery.innerHTML = '';
  //Make a placeholder variable for the search results
  let searchResults = [];
  //For each employee that was returned earlier, make a lower case name and see if it matches the search input
  employeeData.forEach(employee => {
    let name = `${employee.name.first} ${employee.name.last}`;
    let lowerCaseName = name.toLowerCase();
    let lowerCaseSearch = text.toLowerCase();
    //If there's a match, add the employee to the searchResults array
    if (lowerCaseName.includes(lowerCaseSearch)) {
      searchResults.push(employee);
    }
  });
  //Create a new gallery based on search results
  createGallery(searchResults);
  //Add event listeners to the new search results so modal shows when clicked 
  showModal(searchResults);
  //Add no results message
  if (searchResults.length === 0) {
    gallery.innerHTML = `
      <h1>Sorry, no results found.</h1>
    `;
  }  
}


//Listen for search events
document.getElementById('search-input').addEventListener('keyup', (event) => {
  search(event.target.value);
});
//Another search event handler
//This listens for actions like clicking the x to clear the search field in Chrome
document.getElementById('search-input').addEventListener('search', (event) => {
  search(event.target.value);
});