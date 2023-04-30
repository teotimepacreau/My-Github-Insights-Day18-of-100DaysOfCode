console.log('connecté !');

const container = document.querySelector('.container')
console.log(container)

//COURS : ARRAY TO HTML

let wizards = ['Gandalf', 'Randagalst', 'Merlin']
console.log(wizards)
const app = document.querySelector('.app')
console.log(app)

let newArray = wizards.map(function(wizard) {
    return '<li>' + wizard + '</li>'
}).join('');

console.log(newArray)

let[magicien1, magicien2, magicien3 ] = wizards;
console.log(magicien1)

//II.Add a list of my repositories 
Promise.all([
    fetch('https://api.github.com/users/teotimepacreau'),
    fetch('https://api.github.com/users/teotimepacreau/repos?sort=pushed')
]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
        return response.json();
    }))
}).then(function (data) {
    console.log(data)
    render(data)
}).catch(function(error){
    console.log(error)
})

function render(data) {
    let [profile, repos] = data;//ARRAY DESTRUCTURING

    container.innerHTML = 
    `
    <div class="table">
            <header>
                <i class="ph-duotone ph-github-logo"></i>
                <h1>My Github Insights
            </header>
            <div class="profile title">
                <h2>Profile</h2>
            </div>
            <div class="profile content">
                <img src="${profile.avatar_url}"></img>
                <span>@${profile.login}</span>
            </div>
            <div class="number title">
                <h2>Number of repos</h2>
            </div>
            <div class="number content">
                ${profile.public_repos}
            </div>
            <div class="repos title">
                <h2>Visit my repos</h2>
            </div>
            <div class="repos content">
                <a href="${profile.html_url}">${profile.html_url}</a>
            </div>
            <div class="projects title">
                <h2>My Projects</h2>
            </div>
            <ul class="projects content">
            ${repos.map(function(repo){//I used the Array.map() method to loop through each of my repos and create an HTML string.Then I used the Array.join() method to combine the array into a single string, and wrapped it in an unordered list (ul).
                return  `
                            <li><a href="${repo.html_url}">${repo.name}</a> - ${repo.stargazers_count} <i class="ph-fill ph-star"></i></li>
                        `

            }).join('')}
            </ul>
    </div>
    `
}