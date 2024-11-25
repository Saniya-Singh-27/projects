// Generate a random number between 1 and 100
let cnum = Math.floor(Math.random() * 100) + 1;
let attempt = 0;

// Get references to DOM elements
let attemptData = document.getElementById("Attempt");
let userinp = document.getElementById("inp");
let subBtn = document.getElementById("submit");
let resBtn = document.getElementById("resBtn");
let message = document.getElementById("msg");
let attemptsList = document.getElementById("attemptsList"); // Container for attempts
let body = document.body; // Reference to the body
let wrongSound = document.getElementById("wrongSound"); // Reference to the audio element
let winSound = document.getElementById("winSound"); // Reference to the winning sound

// Function to check the user's guess
function check() {
    let usernum = parseInt(userinp.value);

    // Validate the input
    if (!isNaN(usernum) && usernum >= 1 && usernum <= 100) {
        attempt++; // Increment attempt counter
        attemptData.innerHTML = attempt; // Update attempts on the page

        // Create a list item for the attempted number
        let listItem = document.createElement("li");
        listItem.textContent = usernum;
        attemptsList.appendChild(listItem); // Add the attempted number to the list

        // Check if the guess is correct
        if (cnum === usernum) {
            message.innerHTML = "Congratulations, you've guessed the number!";
            message.classList.add("green");
            message.classList.remove("red");
            resBtn.style.display = "block"; // Show the restart button
            winSound.play(); // Play the winning sound
        } else {
            // Provide feedback on the guess
            if (cnum < usernum) {
                message.innerHTML = "Too high! Try again.";
            } else {
                message.innerHTML = "Too low! Try again.";
            }
            message.classList.add("red");
            message.classList.remove("green");
            
            wrongSound.play(); // Play the wrong answer sound
        }

        // Clear the input field after a short delay
        setTimeout(() => {
            userinp.value = "";
            message.innerHTML = "";
        }, 1000);
    } else {
        message.innerHTML = "Please enter a valid number between 1 and 100.";
        message.classList.add("red");
        
        wrongSound.play(); // Play the wrong answer sound
        setTimeout(() => {
            message.innerHTML = "";
        }, 1000);
    }
}

// Function to restart the game
function restart() {
    cnum = Math.floor(Math.random() * 100) + 1; // Generate a new random number
    attempt = 0; // Reset attempt counter
    attemptData.innerHTML = attempt; // Update attempts on the page
    message.innerHTML = ""; // Clear the message
    resBtn.style.display = "none"; // Hide the restart button
    userinp.value = ""; // Clear the input field
    attemptsList.innerHTML = ""; // Clear the list of previous attempts
}

// Add event listeners
subBtn.addEventListener("click", check);
resBtn.addEventListener("click", restart);

// Listen for Enter key press to trigger the check function
userinp.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission (if any)
        check(); // Trigger the same check function as clicking the guess button
    }
});