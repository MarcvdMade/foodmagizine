window.addEventListener("load", init)


let oldId = -15;

let parent;

function loadRecipes(data) {
    //krijg parent element
    let parent = document.getElementById("parent-foods");
    parent.addEventListener('click', clickHandler);

    for (let dish of data) {

        //create food div
        let foodDiv = document.createElement("div");
        foodDiv.classList.add("food-div")

        // foodDiv.classList.add("card");
        foodDiv.setAttribute('id', "div" + dish.id);

        //create elements voor fooddiv
        let food = document.createElement("h2");
        let kitchen = document.createElement("p");
        kitchen.innerHTML = `Kitchen: ${dish.kitchen}`
        food.setAttribute("id", "title"+dish.id)
        food.innerHTML = dish.name;
        let foodImg = document.createElement("img");
        foodImg.setAttribute("src", `https://source.unsplash.com/1600x900/?${dish.name}`);

        //favorite button
        let foodFavBtn = document.createElement("button");
        foodFavBtn.innerHTML = "Add to favorite";
        foodFavBtn.classList.add("card")
        foodFavBtn.setAttribute("id", "fav"+dish.id)

        //recipe button
        let foodRecipeBtn = document.createElement("button");
        foodRecipeBtn.innerHTML = "Show recipe";
        foodRecipeBtn.setAttribute('id', dish.id);
        foodRecipeBtn.classList.add("recipe-button")

        //Create the div
        foodDiv.appendChild(food);
        foodDiv.appendChild(kitchen);
        foodDiv.appendChild(foodImg);
        foodDiv.appendChild(foodFavBtn);
        foodDiv.appendChild(foodRecipeBtn);
        parent.appendChild(foodDiv);
    }
    showLoadedFavorites()

};

function init() {
    fetch("webservice/index.php")
    .then(function (response) {
        if(response.status == 200 && response.ok) {
            return response.json()
        }
        throw new Error(response.statusText)
    })
    .then(loadRecipes)
    .catch(recipesNotLoaded);
}

function recipesNotLoaded() {
    console.log("No data found!")
}


function getLocalFavorites() {
    let favorites = localStorage.getItem("favorites")
    if (favorites) {
        return JSON.parse(favorites)
    } else {
        console.log("er zijn nog geen favorites")
        return []
    }
}

function showLoadedFavorites() {
    let savedItems = getLocalFavorites()
    for (let item of savedItems) {
        console.log(item)
        let card = document.getElementById(item)
        card.parentNode.classList.add("favorite")
        card.innerHTML = "Remove from favorite"
    }
}

function clickHandler(e) {
    let item = e.target

    if (item.classList.contains("card")) {
        let savedItems = getLocalFavorites()
        let index = savedItems.indexOf(item.id)

        if (index > -1) {
            savedItems.splice(index, 1)
            item.parentNode.classList.remove("favorite")
            item.innerHTML = "Add to favorite"
        } else {
            item.parentNode.classList.add("favorite")
            item.innerHTML = "Remove from favorite"
            savedItems.push(item.id)
        }
        console.log(savedItems)
        localStorage.setItem('favorites', JSON.stringify(savedItems))
    }

    if (item.classList.contains("recipe-button")) {
        // check button
        if (oldId == item.id) {
            document.getElementById('recipe').style.visibility = "hidden";
            oldId = -15;
        } else {
            //get target button
            // let id = item.id;

            //fetch data
                fetch(`webservice/index.php?id=${item.id}`)
                .then(function (response) {
                    if(response.status == 200 && response.ok) {
                        return response.json()
                    }
                    throw new Error(response.statusText)
                })
                .then(infoLoaded)
                .catch(infoNotLoaded);

                function infoLoaded(data) {

                    //make recipe info
                    let recipe = document.querySelector("#recipe-info")
                    recipe.innerHTML= ""
                    recipe.innerHTML = `${data.recipe}`

                    //make tags
                    let tags = document.querySelector("#tags")
                    tags.innerHTML= ""
                    tags.innerHTML = `${data.tags}`
                }

                function infoNotLoaded(data) {
                    console.log(data)
                }

            //laat recipe zien
            document.getElementById('recipe').style.visibility = "visible";

            //set old id for clickhandler
            oldId = e.target.id;
        }
    }
}