
const searchInput = document.getElementsByClassName('js-input')[0];
const searchBtn = document.getElementsByClassName('js-search-btn')[0];
const cityBtn = document.getElementsByClassName('js-city-btn')[0];
const stateBtn = document.getElementsByClassName('js-state-btn')[0];
const centerBtn = document.getElementsByClassName('js-center-btn')[0];
const cardContainer = document.querySelector('.card-container');

let selectedFilter = 'all';
let jsonData ;

function getCenters() {
  fetch('https://isro.vercel.app/api/centres')
    .then(response => response.json())
    .then(data => {
      jsonData = data.centres;
      renderCenters(data.centres);
    });
}



function renderCenters(centers) {

  cardContainer.innerHTML = '';
  let htmlString;
  
  centers.forEach(center => {
    if (selectedFilter === 'all' || center[selectedFilter].toLowerCase().includes(searchInput.value.toLowerCase())) {

    //   const card = document.createElement('div');
    //   card.classList.add('center-card');
      
    //   const name = document.createElement('h2');
    //   name.textContent = center.name;
      
    //   const location = document.createElement('p');
    //   location.textContent = `${center.Place}, ${center.State}`;
      
      htmlString = `
                <div class ="card parent">
                    <div class ="w-60">
                        <div>CENTER</div>
                        <div class ="t-overflow">${center.name}</div>
                    </div>
                    <div class ="w-20">
                        <div>CITY</div>
                        <div class ="t-overflow">${center.Place}</div>
                    </div>
                    <div class ="w-20">
                        <div>STATE</div>
                        <div class ="t-overflow">${center.State}</div>
                    </div>
                    
                </div>
      `
      
    //   card.appendChild(name);
    //   card.appendChild(location);
    const div = document.createElement('div');
    div.innerHTML = htmlString;
      
    cardContainer.appendChild( div);
    }    
  });

}

searchBtn.addEventListener('click', () => {
  renderCenters(jsonData);
});

cityBtn.addEventListener('click', () => {
  selectedFilter = 'Place';
  cityBtn.classList.add('active')
  stateBtn.classList.remove('active')
  centerBtn.classList.remove('active');
});

stateBtn.addEventListener('click', () => {
  selectedFilter = 'State';
  stateBtn.classList.add('active')
  cityBtn.classList.remove('active')
  centerBtn.classList.remove('active');
});

centerBtn.addEventListener('click', () => {
  selectedFilter = 'name';
  centerBtn.classList.add('active');
  stateBtn.classList.remove('active')
  cityBtn.classList.remove('active')
});

// getCenters();

document.addEventListener('DOMContentLoaded',getCenters);

