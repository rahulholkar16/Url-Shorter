const LoginBtn = document.querySelector('.login');
const SignBtn = document.querySelector('.Signup');
const navSignBtn = document.querySelector('.nvaSign');
const email = document.querySelector('#email');
const password = document.querySelector('#password');


LoginBtn.addEventListener("click", async () => {
    
    const data = {
        email: email.value,
        password: password.value
    }

    try {
        const response = await fetch('/api/v1/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        const result = await response.json();

        if (result.msg === "Loging successfully!") {
            window.location.href = "../DashboardPage/dashboard.html"
        } else {
            alert(result.msg)
        }
    } catch (error) {
        console.error(err);
        alert("Something went wrong!");
    }
});

SignBtn.addEventListener("click", () => {
    window.location.href = "../SignPage/index.html";
});

navSignBtn.addEventListener("click", () => {
    window.location.href = "../SignPage/index.html";
});