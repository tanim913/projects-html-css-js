const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchButton = document.getElementById("srch");

async function getUser(userName) {
  try {
    const { data } = await axios(APIURL + userName);
    createUserCard(data);
    getRepos(userName);
  } catch (error) {
    if (error.response.status === 404) {
      createErrorCard("No profile with this username");
    }
  }
}

async function getRepos(userName) {
  try {
    const { data } = await axios(APIURL + userName + "/repos?sort=created");
    addReposToCard(data);
  } catch (error) {
    //console.log(err);
    createErrorCard("Problem fetching Repository Data");
  }
}

function createUserCard(user) {
  const userID = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = `
    
    <div class="card">
        <div>
          <img
            class="avatar"
            src="${user.avatar_url}"
            alt="${user.name}"
            width="200" height="200"
          />
        </div>
        <div class="user-info">
          <h2>${userID}</h2>
          <p>
            ${userBio}
          </p>
          <ul>
            <li>${user.followers}<strong>followers</strong></li>
            <li>${user.following} <strong>following</strong></li>
            <li>${user.public_repos} <strong>repositories</strong></li>
          </ul>

          <div id="repos">
            
          </div>
        </div>
      </div>

    `;
  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardHTML = `

        <div class = "card">
            <h2>${msg}</h2>
        </div>
    `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repos");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
