// ------------------ Збереження системної інформації ------------------

localStorage.setItem('os', navigator.platform);
localStorage.setItem('browser', navigator.userAgent);

const systemInfo = document.getElementById('systemInfo');
if (systemInfo) {
    systemInfo.innerHTML = `
        <p><strong>OS:</strong> ${localStorage.getItem('os')}</p>
        <p><strong>Browser:</strong> ${localStorage.getItem('browser')}</p>
    `;
}

// ------------------ Отримання коментарів з сервера ------------------

const commentsContainer = document.getElementById('commentsList');
const variantNumber = 1;

fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
    .then(response => response.json())
    .then(comments => {
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.style.border = "1px solid #ccc";
            commentEl.style.padding = "10px";
            commentEl.style.marginBottom = "10px";

            commentEl.innerHTML = `
                <p><strong>${comment.name}</strong> (${comment.email})</p>
                <p>${comment.body}</p>
            `;
            commentsContainer.appendChild(commentEl);
        });
    })
    .catch(error => {
        commentsContainer.innerHTML = "<p>Не вдалося завантажити коментарі.</p>";
        console.error("Помилка при завантаженні коментарів:", error);
    });

// ------------------ Модальне вікно через 60 секунд ------------------

function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex'; // Центрування через flex
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

setTimeout(showModal, 60000);


// ------------------ Перемикач теми (кнопка) ------------------

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");

    // Встановлення теми при завантаженні сторінки
    const savedTheme = localStorage.getItem("theme");
    const currentHour = new Date().getHours();

    if (savedTheme === "dark" || (!savedTheme && (currentHour < 7 || currentHour >= 21))) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    // Обробник кліку по кнопці
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});
