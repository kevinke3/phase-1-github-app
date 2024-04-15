const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const userList = document.getElementById('user-list');
const repoList = document.getElementById('repo-list');

// Set up event listener for form submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    return;
  }
  searchUsers(searchTerm);
});

// Function to search for users
async function searchUsers(searchTerm) {
  const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  const data = await response.json();
  displayUsers(data.items);
}

// Function to display the list of users
function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${user.html_url}" target="_blank">
        <img src="${user.avatar_url}" alt="${user.login} avatar">
        <p>${user.login}</p>
      </a>
    `;
    userList.appendChild(li);
  });
}

// Function to display the list of repositories for a user
async function displayRepos(repos) {
  repoList.innerHTML = '';
  repos.forEach((repo) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${repo.html_url}" target="_blank">
        <p>${repo.name}</p>
      </a>
    `;
    repoList.appendChild(li);
  });
}

// Function to search for repositories for a user
async function searchRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  const data = await response.json();
  displayRepos(data);
}

// Function to handle clicks on user list items
function handleUserClick(e) {
  if (e.target.tagName === 'A') {
    const username = e.target.querySelector('p').textContent;
    searchRepos(username);
  }
}

// Set up event listener for user list clicks
userList.addEventListener('click', handleUserClick);