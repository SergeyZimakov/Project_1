let stateZimakov = []

//getting data from local storage if exist
if (window.localStorage.getItem('stateZimakov')) {
    stateZimakov = JSON.parse(window.localStorage.getItem('stateZimakov'))
}

//update state
function addNewNoteToState(event) {
    event.preventDefault()
    let task = document.getElementById('taskInput').value
    let date = document.getElementById('dateInput').value
    let time = document.getElementById('timeInput').value
    stateZimakov.push(
        {
            task,
            date,
            time
        }
    )
    console.log(stateZimakov)
    window.localStorage.setItem('stateZimakov', JSON.stringify(stateZimakov))
    render()
    clearInput()
}

//clear or refresh inputs 
function clearInput() {
    document.getElementById('taskInput').value = ''
    document.getElementById('dateInput').value = ''
    document.getElementById('timeInput').value = ''
}

//refresh displayed content (notes from the state)
function render() {
    let content = document.getElementById('content')
    content.innerHTML = ''
    for (i = stateZimakov.length; i >= 0; i --) {
        item = stateZimakov[i]
        if (item) {
            content.appendChild(createSingleNote(item.task, item.date, item.time, i))
        }
    }
}

//div of each note
function createSingleNote(task, date, time, index) {
    let createdNote = document.createElement('div') //a stick
    createdNote.className = 'createdNote'
    let removeIcon = document.createElement('div') //remove icon (X in the corner)
    removeIcon.innerHTML = '<i class="glyphicon glyphicon-remove"></i>'
    removeIcon.className = 'removeIcon'
    removeIcon.id = index
    removeIcon.onclick = removeItem
    let p = document.createElement('p') //the task
    p.innerHTML = task
    let deadline = document.createElement('div') //date and time
    deadline.innerHTML = `<span id="date">${date}</span><br><span id="time">${time}</span></div>`
    deadline.className = 'deadline'
    createdNote.appendChild(removeIcon)
    createdNote.appendChild(p)
    createdNote.appendChild(deadline)
    return createdNote
}

//remove the note
function removeItem(event) {
    let index = event.target.parentElement.id
    stateZimakov[index] = null
    window.localStorage.setItem('stateZimakov', JSON.stringify(stateZimakov))
    render()
}

render()