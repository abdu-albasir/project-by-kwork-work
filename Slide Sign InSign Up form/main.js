const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");  // Исправление на firstForm
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

// Обработка регистрации (Sign Up)
firstForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Registration form submitted");

    const nickname = firstForm.querySelector('input[type="text"]').value;
    const email = firstForm.querySelector('input[type="email"]').value;
    const password = firstForm.querySelector('input[type="password"]').value;

    console.log("Nickname:", nickname);
    console.log("Email:", email);
    console.log("Password:", password);

    if (nickname && email && password) {
        const userData = {
            nickname,
            email,
            password
        };

        // Сохраняем данные пользователя в localStorage (используем email как ключ)
        localStorage.setItem(email, JSON.stringify(userData));
        console.log("User data saved to localStorage:", userData);

        // Перенаправляем на другую страницу после регистрации
        window.location.href = "welcome.html"; // Замените 'welcome.html' на вашу нужную страницу
    } else {
        alert("Please fill out all fields.");
        console.log("Missing fields in registration form");
    }
});

// Обработка входа (Sign In)
secondForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    const loginEmailOrNickname = secondForm.querySelector('input[type="email"]').value;
    const loginPassword = secondForm.querySelector('input[type="password"]').value;

    console.log("Email or Nickname:", loginEmailOrNickname);
    console.log("Password:", loginPassword);

    const storedUserData = JSON.parse(localStorage.getItem(loginEmailOrNickname));  // Используем email как ключ для поиска данных
    console.log("Stored user data from localStorage:", storedUserData);

    // Проверяем, есть ли данные пользователя в localStorage
    if (storedUserData) {
        // Проверяем, совпадает ли пароль
        if (storedUserData.password === loginPassword) {
            console.log("Login successful");
            window.location.href = "welcome.html"; // Перенаправляем на страницу приветствия
        } else {
            alert("Invalid password. Please try again.");
            console.log("Invalid password");
        }
    } else {
        alert("No user found. Please register first.");
        console.log("No user data found in localStorage");
    }
});
