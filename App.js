//getting reference to all the html components
const searchInput = document.getElementsByClassName("js-input")[0];
const searchBtn = document.getElementsByClassName("js-search-btn")[0];
const cityBtn = document.getElementsByClassName("js-city-btn")[0];
const stateBtn = document.getElementsByClassName("js-state-btn")[0];
const centerBtn = document.getElementsByClassName("js-center-btn")[0];
const cardContainer = document.getElementsByClassName("js-card-container")[0];

//search filter by state ,name or place
let selectedFilter;
//jsonData holds the data fetched from the API
let jsonData;

//fetching data from the API
async function getCenters() {
  try {
    const response = await fetch("https://isro.vercel.app/api/centres");
    const data = await response.json();
    jsonData = data.centres;
    renderCenters(jsonData);
  } catch (error) {
    console.log(error);
  }
}

//rnders the card components inside the card-container
function renderCenters(centers, selectedFilter = "all") {
  cardContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  //traverse through the array of objects and creates the card components as per the matched search string
  centers.forEach((center) => {
    if (
      selectedFilter === "all" ||
      center[selectedFilter]
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      
      const card = createCardElement(center.name, center.Place, center.State);
      fragment.appendChild(card);
    }
  });
  //renders the card components onto the card-container DOM 
  cardContainer.appendChild(fragment);
}

//creates card component with the name,place and state  and returns the card coponent
function createCardElement(name, place, state) {
  //parent div container
  const centerElement = document.createElement("div");
  centerElement.classList.add("card", "parent", "d-flex", "flex-sp-between");

//CENTER div container
  const w60 = document.createElement("div");
  w60.classList.add("w-60");

  const centerLabel = document.createElement("div");
  centerLabel.innerText = "CENTER";
  w60.appendChild(centerLabel);

  const centerName = document.createElement("div");
  centerName.classList.add("t-overflow");
  centerName.innerText = name;
  w60.appendChild(centerName);

  //CITY div container
  const w20City = document.createElement("div");
  w20City.classList.add("w-20");

  const cityLabel = document.createElement("div");
  cityLabel.innerText = "CITY";
  w20City.appendChild(cityLabel);

  const cityName = document.createElement("div");
  cityName.classList.add("t-overflow");
  cityName.innerText = place;
  w20City.appendChild(cityName);

// STATE div container
  const w20State = document.createElement("div");
  w20State.classList.add("w-20");

  const stateLabel = document.createElement("div");
  stateLabel.innerText = "STATE";
  w20State.appendChild(stateLabel);

  const stateName = document.createElement("div");
  stateName.classList.add("t-overflow");
  stateName.innerText = state;
  w20State.appendChild(stateName);

  //appending name,city and state onto the parent div
  centerElement.appendChild(w60);
  centerElement.appendChild(w20City);
  centerElement.appendChild(w20State);

  return centerElement;
}

//handles search button click
function handleSearchBtnClick() {
  renderCenters(jsonData, selectedFilter);
}

//handles city button click
function handleCityBtnClick() {
  selectedFilter = "Place";
  cityBtn.classList.add("active");
  stateBtn.classList.remove("active");
  centerBtn.classList.remove("active");
}

//handles state button click
function handleStateBtnClick() {
  selectedFilter = "State";
  stateBtn.classList.add("active");
  cityBtn.classList.remove("active");
  centerBtn.classList.remove("active");
}

//handles center button click
function handleCenterBtnClick() {
  selectedFilter = "name";
  centerBtn.classList.add("active");
  stateBtn.classList.remove("active");
  cityBtn.classList.remove("active");
}

//binds events to the buttons
function bindEvents() {
  searchBtn.addEventListener("click", handleSearchBtnClick);
  cityBtn.addEventListener("click", handleCityBtnClick);
  stateBtn.addEventListener("click", handleStateBtnClick);
  centerBtn.addEventListener("click", handleCenterBtnClick);
}

//main function
function main() {
  bindEvents();
  getCenters();
}

//invokes main when DOM Contents Loaded
document.addEventListener("DOMContentLoaded", main);
