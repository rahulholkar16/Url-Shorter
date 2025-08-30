const SignUpBtn = document.querySelector('.signup');
const LoginBtn = document.querySelector('.login');
const NavLoginBtn = document.querySelector('.NavLogin');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

SignUpBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const data = {
        name: name.value,
        email: email.value,
        password: password.value
    }
    
    try {
        const response = await fetch('/api/v1/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.msg === "User added Successfully!") {
            window.location.href = "../LoginPage/index.html";
        } else {
            alert(result.msg);
        }
    } catch (error) {
        console.error(err);
        alert("Something went wrong!");
    }
});

LoginBtn.addEventListener("click", () => {
    window.location.href = "../LoginPage/index.html";
});

NavLoginBtn.addEventListener("click", () => {
    window.location.href = "../LoginPage/index.html";
});
