//Declare variables 
const searchContainer = document.getElementsByClassName('search-container')[0];
const gallery = document.getElementsByClassName('gallery')[0];

//Create HTML elements
const searchHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
`;
searchContainer.insertAdjacentHTML('beforeend', searchHTML);