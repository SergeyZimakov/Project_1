let state = []
if (window.localStorage.getItem('state')) {
    state = JSON.parse(window.localStorage.getItem('state'))
}


function addNewNoteToState(event) {
    event.preventDefault()
    let task = document.getElementById('taskInput').value
    let date = document.getElementById('dateInput').value
    let time = document.getElementById('timeInput').value
    state.push(
        {
            task,
            date,
            time
        }
    )
    console.log(state)
    window.localStorage.setItem('state', JSON.stringify(state))
    render()
    clearInput()
}
function clearInput() {
    document.getElementById('taskInput').value = ''
    document.getElementById('dateInput').value = ''
    document.getElementById('timeInput').value = ''
}

function render() {
    let content = document.getElementById('content')
    content.innerHTML = ''
    for (i = state.length; i >= 0; i --) {
        item = state[i]
        if (item) {
            content.appendChild(createSingleNote(item.task, item.date, item.time, i))
        }
    }
}

function createSingleNote(task, date, time, index) {
    let createdNote = document.createElement('div')
    createdNote.className = 'createdNote'
    let removeIcon = document.createElement('div')
    removeIcon.innerHTML = '<i class="glyphicon glyphicon-remove"></i>'
    removeIcon.className = 'removeIcon'
    removeIcon.id = index
    removeIcon.onclick = removeItem
    let p = document.createElement('p')
    p.innerHTML = task
    let deadline = document.createElement('div')
    deadline.innerHTML = `<span id="date">${date}</span><br><span id="time">${time}</span></div>`
    deadline.className = 'deadline'
    createdNote.appendChild(removeIcon)
    createdNote.appendChild(p)
    createdNote.appendChild(deadline)
    return createdNote
}

function removeItem(event) {
    let index = event.target.parentElement.id
    state[index] = null
    window.localStorage.setItem('state', JSON.stringify(state))
    render()
}
render()