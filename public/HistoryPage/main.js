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

        const tbody = document.querySelector(".table-wrapper");
        tbody.innerHTML = "";  // Clear existing rows

        data.history.forEach(history => {
            const div = document.createElement("div");
            div.className = "history-row";
            div.innerHTML = `
                <div class="field">
                        <label>Original Link</label>
                        <span class="original">${history.origenalUrl}</span>
                    </div>
                    <div class="field">
                        <label>Short Link</label>
                        <a href="https://localhost:3000/url${history.sortUrl}" class="short-link">https://localhost:3000/url/${history.sortUrl}</a>
                    </div>
                    <div class="field">
                        <label>Date</label>
                        <span class="date">${history.createdAt}</span>
                    </div>
            `;
            tbody.appendChild(div);
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

