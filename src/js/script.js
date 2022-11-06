import { ItemArray } from "../classes/ItemArray.js";

const { createApp } = window.Vue;

const SIGNED_IN_KEY = "logged-in-user-storage-key";

const MY_LIST_KEY = "my-list-storage-key";

const filterComingSoon = (value, itemList) =>
  itemList.filter((item) => item.comingSoon === value);

const filterGenre = (key, itemList) =>
  itemList.filter((item) => item.genre === key);

const Component = {
  data() {
    return {
      itemList: ItemArray,
      userArray: [],
      username: "",
      watchList: [],
    };
  },
  // filter functions
  computed: {
    comingSoonList() {
      return filterComingSoon(true, this.itemList);
    },
    availableList() {
      return filterComingSoon(false, this.itemList);
    },
    actionList() {
      return filterGenre("Action", this.itemList);
    },
    comedyList() {
      return filterGenre("Comedy", this.itemList);
    },
    romanceList() {
      return filterGenre("Romance", this.itemList);
    },
    horrorList() {
      return filterGenre("Horror", this.itemList);
    },
  },
  // signs user out
  methods: {
    // signs user out
    logout() {
      localStorage.removeItem(SIGNED_IN_KEY);
      window.location.href = "../../index.html";
    },
    // button that locates items to myList.js page
    myListBtn() {
      window.location.href = "../pages/watch-list-page.html";
    },
    // my list local storage function
    addToWatchList(item) {
      if (!localStorage.getItem(MY_LIST_KEY)) {
        let watchListArray = [];
        watchListArray.push(item);
        localStorage.setItem(MY_LIST_KEY, JSON.stringify(watchListArray));
      } else {
        let watchListArray = JSON.parse(localStorage.getItem(MY_LIST_KEY));
        watchListArray.push(item);
        localStorage.setItem(MY_LIST_KEY, JSON.stringify(watchListArray));
      }
    },
  },





  // html template
  template: /* html */ `
    <header id="myHeader">
      <a href="#" class="netflix-logo"><img src="./../images/netflix.png" alt="Netflix logo"/></a>
      <ul class="navigation-list">
        <li>Home</li>
        <li><a href="./my-list.html">My List</a></li>
      </ul>

      <div class="search-and-dropdown">
        <div class="search">
          <input type="search" placeholder="search movies, series" id="search"/>
          <i class="fa fa-search"></i>
        </div>
        <div class="dropdown">
          <button class="pfp-button"><img src="./../images/pfp.png" alt="profile picture" class="pfp"></button>
          <div class="dropdown-content">
            <p>{{ username }}</p>
            <p @click="logout">Log out</p>
          </div>
        </div>
      </div>
    </header>

    <main id="myMain">
      <section class="banner" v-for="item in comingSoonList.slice(0, 1)">
        <video class="bg" autoplay muted loop>
          <source :src="item.preview" type="video/mp4">
        </video>
        <div class="content">
          <img :src="item.poster" class="movieTitle" :alt="item.name" />
          <p>{{ item.description }}</p>
          <div class="buttons">
          <button class="button play"><a :href="item.trailer" target="_blank"><i class="fa fa-play"></i> Play</a></button>
          <button class="button info" id="myBtn"><i class="fa fa-plus"></i> Click for more</button>

        <!-- Modal -->
        <div id="myModal" class="modal">
          <div class="modal-content">
            <div class="modal-banner">
              <span class="close">&times;</span>
              <video class="banner-video" autoplay muted loop>
                <source :src="item.preview" type="video/mp4">
              </video>
            <div class="modal-header-content">
              <span><img :src="item.poster" class="modalMovieTitle" :alt="item.name" /></span>
              <div class="modal-buttons">
                <button class="button modal-play"><a :href="item.trailer" target="_blank"><i class="fa fa-play"></i> Play</a></button>
                <button class="modal-add"><i class="fa fa-plus"></i></button>
              </div>
            </div>
            </div>
            <h3>About {{ item.name }}</h3>
            <div class="modal-body">
              <div class="modal-description">
              <p>{{ item.description }}</p>
            </div>
            <div class="modal-meta">
              <p>Release: {{ item.releaseDate }}</p>
              <p>Runtime: {{ item.runtime }}</p>
              <p>Rating: {{ item.rating }}</p>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


     <section>
     <div id="headrow">
      <div class="row">
        <h2 class="row_title"></h2>
        <div class="row_posters"></div>
      </div>
     </div>
     </section>



      <section id="content-grid">
        <div class="container-heading">Action</div>
          <div class="container">
            <div class="box hover-button-display" v-for="(item, index) in actionList.slice(0, 6)" :id="item.id" :class="item.name" :alt="item.name">
              <img class="bg" :src="item.poster" />
              <button type="button" class="hover-button" @click="addToWatchList(actionList[index])"><i>ADD</i></button>
            </div>
          </div>

        <div class="container-heading">Comedy</div>
          <div class="container">
            <div class="box hover-button-display" v-for="(item, index) in comedyList.slice(0, 6)" :id="item.id" :class="item.name" :alt="item.name">
              <img class="bg" :src="item.poster" />
              <button type="button" class="hover-button" @click="addToWatchList(comedyList[index])"><i>ADD</i></button>
            </div>
          </div>

        <div class="container-heading">Romance</div>
          <div class="container">
            <div class="box hover-button-display" v-for="(item, index) in romanceList.slice(0, 6)" :id="item.id" :class="item.name" :alt="item.name">
              <img class="bg" :src="item.poster" />
              <button type="button" class="hover-button" @click="addToWatchList(romanceList[index])"><i>ADD</i></button>
            </div>
          </div>

        <div class="container-heading">Horror</div>
          <div class="container">
            <div class="box hover-button-display" v-for="(item, index) in horrorList.slice(0, 6)" :id="item.id" :class="item.name" :alt="item.name">
              <img class="bg" :src="item.poster" />
              <button type="button" class="hover-button" @click="addToWatchList(horrorList[index])"><i>ADD</i></button>
            </div>
          </div>
      </section>
   </main>
  `,
  mounted() {
    this.userArray = JSON.parse(localStorage.getItem(SIGNED_IN_KEY));
    this.username = this.userArray[0]._username;
  },
};

// mounting app
window.addEventListener("DOMContentLoaded", () => {
  const app = createApp(Component);
  app.mount("#app");
  // sticky header
  let header = document.querySelector("#myHeader");
  let sticky = header.offsetTop;

  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  window.onscroll = function () {
    myFunction();
  };

  // Get the modal
  let modal = document.querySelector("#myModal");
  let btn = document.querySelector("#myBtn");
  let span = document.querySelector(".close");

  btn.onclick = function () {
    modal.style.display = "block";
  };
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

//------------------------------------------------------------------

//to check the following and remove after testing;
// My Api key from TMDB
const api = "api_key=6c90eb1cbe9a729f47eba5b53199555e";

// base url of the site
const base_url = "https://api.themoviedb.org/3";

// url
const final_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api;

// img url
const img_url = "https://image.tmdb.org/t/p/original";

const requests = {
  fetchPopular: `${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${api}`,
  fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
  fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
  // fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
  // fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
  // fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
  // fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
  // fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=27`,
};

//trending

fetch(requests.fetchPopular)
.then((res) => res.json())
.then((data) => {
  const headrow = document.getElementById("headrow");
  const row = document.createElement("div");
  row.className = "row";
  row.classList.add("popularrow");
  headrow.appendChild(row);
  const title = document.createElement("h2");
  title.className = "row_title";
  title.innerText = "Trending Now";
  row.appendChild(title);
  const row_posters = document.createElement("div");
  row_posters.className = "row_posters";
  row.appendChild(row_posters);
  data.results.forEach(movie => {
    const poster = document.createElement("img");
    poster.className = "row_posterLarge";
    var s2 = movie.id;
    poster.id = s2;
    poster.src = img_url + movie.poster_path;
    row_posters.appendChild(poster);

  });
});

// top rated

fetch(requests.fetchTrending)
.then((res) => res.json())
.then((data) => {
  const headrow = document.getElementById("headrow");
  const row = document.createElement("div");
  row.className = "row";
  headrow.appendChild(row);
  const title = document.createElement("h2");
  title.className = "row_title";
  title.innerText = "Top Rated";
  row.appendChild(title);
  const row_posters = document.createElement("div");
  row_posters.className = "row_posters";
  row.appendChild(row_posters);
  data.results.forEach(movie => {
    console.log(movie);
    const poster = document.createElement("img");
    poster.className = "row_posterLarge";
    var s2 = movie.id;
    poster.id = s2;
    poster.src = img_url + movie.poster_path;
    row_posters.appendChild(poster);

  });
});
