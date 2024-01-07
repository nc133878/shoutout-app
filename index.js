// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//get db location
const appSettings = {
    databaseURL: "https://playground-4a9a5-default-rtdb.europe-west1.firebasedatabase.app/"
}

// set app variables and DB references
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

//set DOM vsariables
const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementOutput = document.getElementById("endorsement-output")

// add input to DB
publishBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    
    push(endorsementListInDB, inputValue)
    
    clearInputFieldEl()
})

//load DB value on page with every update
onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val())
        
         clearEndorsementListEl()
        
     for (let i = endorsementArray.length-1 ; i >= 0; i--) {
         
            let currentEndorsement = endorsementArray[i]
            let currentEndorsementID = currentEndorsement[0]
            let currentEndorsementValue = currentEndorsement[1]
            
            appendItemToEndorsementOuput(currentEndorsement)            
            
        }    
    } else {
        endorsementOutput.innerHTML = "No items here... yet"
    }
    
})

//reset output on realtime refresh
function clearEndorsementListEl() {
    endorsementOutput.innerHTML = ""
}

//clear out input after entry
function clearInputFieldEl() {
    inputEl.value = ""
}

//
function appendItemToEndorsementOuput(message) {
    let messageID = message[0]
    let messageValue = message[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = messageValue
    
    endorsementOutput.append(newEl)
}