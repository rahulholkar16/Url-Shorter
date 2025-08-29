const $ = (id) => document.getElementById(id);
const dashboardBtn = $('dashboardnav');
const History = $('navHistory');

async function historyFetch() {
    try {
        const res = await fetch('http://localhost:3000/api/v1/history', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })

        const data = await res.json();

        const tbody = document.getElementById("historyBody");
        tbody.innerHTML = "";  // Clear existing rows

        data.history.forEach(history => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="muted">${history.origenalUrl}</td>
                <td>
                    <a href="http://localhost:3000/url/${history.sortUrl}" class="short-link" target="_blank" rel="noopener noreferrer">
                        http://localhost:3000/url/${history.sortUrl}
                    </a>
                </td>
                <td>${new Date(history.createdAt).toLocaleDateString()}</td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.log("Hisory error: "+error);
    }
}

historyFetch();

dashboardBtn.addEventListener('click', () => {
    window.location.href = "../DashboardPage/dashboard.html";
});

History.addEventListener('click', async () => {
    window.location.href = "history.html";
});

