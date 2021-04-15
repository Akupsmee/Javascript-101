// *****************  SELECT ITEMS  *****************
const alert = document.querySelector(".alert")
const form = document.querySelector(".grocery-form")
const grocery = document.getElementById("grocery")
const submitBtn = document.querySelector(".submit-btn")
const container = document.querySelector(".grocery-container")
const list = document.querySelector(".grocery-list")
const clearBtn = document.querySelector(".clear-btn")

// *****************  EDIT OPTION  *****************
let editElement
let editFlag = false
let editID = ""

// *****************  EVENT LISTENERS *****************
// submit form
form.addEventListener("submit", addItem)
// clear items
clearBtn.addEventListener("click", clearItems)
// load items on refresh 
window.addEventListener("DOMContentLoaded", setupItems)

// *****************  FUNCTIONS  ****************
function addItem(e) {
    e.preventDefault()
    const value = grocery.value
    const id = new Date().getTime().toString()
    // longer form
    // if(value !== "" && editFlag === false){
    // }else if(value !== "" && editFlag === true){
   // }else{
    // }

    //shorter form
    if (value && !editFlag) {
        createListItem(id, value)
        displayAlert("item added to the list", "success")
        // show container
        container.classList.add("show-container")
        // add to local storage
        addToLocalStorage(id, value)
        // set back to default
        setBackToDefault()
    } else if (value && editFlag) {
        editElement.innerHTML = value
        displayAlert("value changed", "success")
        // edit local storage has two arguments. first is the editID of the element called in the edit function, second is the new value entered in the input field; since editFlag is now true
        editLocalStorage(editID, value)
        setBackToDefault()
    } else {
        displayAlert("please enter value", "danger")
    }

}

// display alert
function displayAlert(text, action) {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)
    // remove alert
    setTimeout(function () {
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    }, 1000)

}

// clearItems
function clearItems() {
    const items = document.querySelectorAll(".grocery-item")
    if (items.length > 0) {
        items.forEach(item => {
            list.removeChild(item)
        })
    }
    container.classList.remove("show-container")
    displayAlert("Lists succesfully cleared", "success")
    localStorage.removeItem("list")
    setBackToDefault()
}
// edit function 
function editItem(e) {
    const stuck = e.currentTarget.parentElement.parentElement
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling
    // set form value
    grocery.value = editElement.innerHTML
    editFlag = true
    editID = stuck.dataset.id
    submitBtn.textContent = "edit"
}


// delete function
function deleteItem(e) {
    const stuck = e.currentTarget.parentElement.parentElement
    // accessing the id values from the dataset attribute
    const id = stuck.dataset.id
    // remove current targeted stuck
    list.removeChild(stuck);
    // only if list is empty should we delete the "show-container" class
    if (list.children.length === 0) {
        container.classList.remove("show-container")
    }
    displayAlert("item removed", "success")
    setBackToDefault()
    // remove from local storage
    removeFromLocalStorage(id)
}



// set back to default
function setBackToDefault() {
    grocery.value = ""
    editFlag = false
    editID = ""
    submitBtn.textContent = "submit"
    console.log("here");
}

// *****************  LOCAL STORAGE  *****************

function addToLocalStorage(id, value) {
    // const groceryItem = {id:id, value:value}
    // ES6 shortcut : if key and value matches we can represent them as one value
    const groceryItem = {
        id,
        value
    }

    // trenary operator like an if else statement. e.g. if(true)? do this : else do this
    let items = getLocalStorage()
    console.log(items);
    items.push(groceryItem)
    localStorage.setItem("list", JSON.stringify(items))
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage()

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item
        }
    })
    localStorage.setItem("list", JSON.stringify(items))
}

function editLocalStorage(id, value) {
    let items = getLocalStorage()
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value
        }
        return item
    })
    localStorage.setItem("list", JSON.stringify(items))
}

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}
//  localStorage.setItem("orange", JSON.stringify(["item", "item2"]))
// let oranges = JSON.parse(localStorage.getItem("orange"))
// console.log(oranges);
// localStorage.removeItem("orange")

// *****************  SETUP ITEMS *****************
function setupItems() {
    let items = getLocalStorage()
    if (items.length > 0) {
        items.forEach(item => {
            createListItem(item.id, item.value)
        })
        container.classList.add("show-container")
    }
}

function createListItem(id, value) {
    // add element
    const element = document.createElement("article")
    // add class
    element.classList.add("grocery-item")
    // add id 
    const attr = document.createAttribute("data-id")
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = `<p class="title">${value}</p>
                        <div class="btn-container">
                            <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                            </button>
                            <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                            </button>
                        </div>`

    const deleteBtn = element.querySelector(".delete-btn")
    const editBtn = element.querySelector(".edit-btn")

    deleteBtn.addEventListener("click", deleteItem)
    editBtn.addEventListener("click", editItem)
    // append child
    list.appendChild(element)
}