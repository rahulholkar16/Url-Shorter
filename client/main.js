const getStartedBtn = document.querySelector(".getStarted");
const HeroLoginBtn = document.querySelector('.heroLogin');
const NavLoginBtn = document.querySelector('.NavLogin');
const SignUpBtn = document.querySelector('.signup');

getStartedBtn.addEventListener("click", async () => {
    const response = await fetch("api/v1/dashboard", {
        method: "GET",
        credentials: "include"
    })

    const data = await response.json();
    if (data.success == false) {
        window.location.href = "/LoginPage/index.html";
    }else{
        window.location.href = "/DashboardPage/dashboard.html";
    }
})

HeroLoginBtn.addEventListener('click', () => {
    window.location.href = "/LoginPage/index.html";
});

NavLoginBtn.addEventListener('click', () => {
    window.location.href = "/LoginPage/index.html";
});

SignUpBtn.addEventListener('click', () => {
    window.location.href = "/SignPage/index.html";
});