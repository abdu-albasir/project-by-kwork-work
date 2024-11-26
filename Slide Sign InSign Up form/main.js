const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
    console.log("Sign In button clicked");
    container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
    console.log("Sign Up button clicked");
    container.classList.add("right-panel-active");
});

// Handle registration (Sign Up)
fistForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Registration form submitted");

    const nickname = fistForm.querySelector('input[type="text"]').value;
    const email = fistForm.querySelector('input[type="email"]').value;
    const password = fistForm.querySelector('input[type="password"]').value;

    console.log("Nickname:", nickname);
    console.log("Email:", email);
    console.log("Password:", password);

    if (nickname && email && password) {
        const userData = {
            nickname,
            email,
            password
        };

        // Save user data in localStorage (Note: you can also store this in an array to handle multiple users)
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log("User data saved to localStorage:", userData);

        // Redirect to another HTML page after registration
        window.location.href = "welcome.html"; // Change 'welcome.html' to your desired page
    } else {
        alert("Please fill out all fields.");
        console.log("Missing fields in registration form");
    }
});

// Handle login (Sign In)
secondForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    const loginEmailOrNickname = secondForm.querySelector('input[type="email"]').value;
    const loginPassword = secondForm.querySelector('input[type="password"]').value;

    console.log("Email or Nickname:", loginEmailOrNickname);
    console.log("Password:", loginPassword);

    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    console.log("Stored user data from localStorage:", storedUserData);

    // Check if user data exists in localStorage
    if (storedUserData) {
        // Check if email/nickname and password match
        if ((storedUserData.email === loginEmailOrNickname || storedUserData.nickname === loginEmailOrNickname) &&
            storedUserData.password === loginPassword) {
            console.log("Login successful");
            window.location.href = "welcome.html"; // Redirect to welcome page after successful login
        } else {
            alert("Invalid credentials. Please try again.");
            console.log("Invalid credentials");
        }
    } else {
        alert("No user found. Please register first.");
        console.log("No user data found in localStorage");
    }
});
