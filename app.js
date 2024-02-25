class Tea {
    constructor(name, temp, time) {
        this.name = name
        this.temp = temp
        this.time = time
        this.identifier = name.replace(" ", "").toLowerCase()
    }
}

function getFormattedTime(time) {
    let seconds = time - Math.floor(time/60)*60
    return `${Math.floor(time/60)}:${seconds < 10 ? "0" : ""}${seconds}`
}

const teas = [
    new Tea("Black Tea", 100, 240),
    new Tea("Green Tea", 80, 150),
    new Tea("White Tea", 80, 150),
    new Tea("Yellow Tea", 80, 150),
    new Tea("Fruit Tea", 100, 240),
    new Tea("Herbal Tea", 100, 240),
]

onload = (e) => {
    let container = document.getElementById("teas")
    for (let tea of teas) {
        container.innerHTML += `<div class="tea">
			<h1>${tea.name}</h1>
			<p>${tea.temp}°C</p>
			<p class="timer" id=${tea.identifier}>${getFormattedTime(tea.time)}</p>
			<button onclick="startTimer('${tea.identifier}', ${tea.time}, this, '${tea.name}')" class="brew">Brew</button>
		</div>`
    }
}

var playSound = false
var giveNotif = false
function startTimer(id, time, btn, teaname) {
    let audio = new Audio('tea.mp3');
    audio.volume = 0
    audio.loop = true
    audio.play();
    btn.innerText = "Cancel"
    let timeLeft = time
    let timer = setInterval(() => {
        btn.onclick = () => { resetTimer(timer, btn, id, time) }
        if (timeLeft == 0) {
            resetTimer(timer, btn, id, time)
            const img = "icon.png";
            const text = `Your ${teaname} timer is complete.`;
            if (playSound) {
                audio.currentTime = 0
                audio.volume = 1
                setTimeout(() => {
                    audio.volume = 0
                }, 3150)
            }
            if (giveNotif) {
                let notification = new Notification("Tea Time", { body: text, icon: img });
            }
        } else {
            document.getElementById(id).innerText = getFormattedTime(timeLeft)
            timeLeft--
        }
    }, 1000)
}

function resetTimer(intervalId, btn, identifier, time) {
    clearInterval(intervalId)
    btn.innerText = "Brew"
    document.getElementById(identifier).innerText = getFormattedTime(time)
    btn.onclick = () => { startTimer(identifier, time, btn) }
}

// console.log(Notification?.permission)
// if (Notification?.permission == "granted") {
//     console.log("yolo")
//     const img = "icon.png";
//     const text = `Your black tea timer is complete.`;
//     const notification = new Notification("Tea Time", { body: text, icon: img });
// }

var numCompleted = 0
function answer(category, ans) {

    if (category == 'notif' && ans) {
        Notification.requestPermission((result) => {
            if (result == 'granted') {
                giveNotif = true
            } else {
                alert("You didn't give us permission to notify you. You can change this in your browser settings.")
            }
        });
    }
    if (category == 'sound' && ans) {
        playSound = true
    }

    document.getElementById(category + "P").hidden = true
    document.getElementById(category + "Y").hidden = true
    document.getElementById(category + "N").hidden = true
    numCompleted++
    if (numCompleted == 2) {
        document.getElementById("options").style.scale = "0 0"
    }
}