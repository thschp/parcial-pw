document.addEventListener("DOMContentLoaded", () => {
    const newsView = document.querySelector("#newsView");
    const formView = document.querySelector("#formView");
    const aboutView = document.querySelector("#aboutView");
    const cards = [...document.querySelectorAll(".news-card")];

    let employeeIndex = 0;

    const employees = [
        {
            name: "Thomas Chica",
            role: "Director de noticias",
            photo: "Foto de Thomas",
            facebook: "https://www.facebook.com",
            twitter: "https://twitter.com",
            linkedin: "https://www.linkedin.com"
        },
        {
            name: "David Rojas",
            role: "Editor y periodista",
            photo: "Foto de David",
            facebook: "https://www.facebook.com",
            twitter: "https://twitter.com",
            linkedin: "https://www.linkedin.com"
        },
        {
            name: "Linus Torvalds",
            role: "Diseñador digital",
            photo: "Foto de don Linus",
            facebook: "https://www.facebook.com",
            twitter: "https://twitter.com",
            linkedin: "https://www.linkedin.com"
        }
    ];

    function hideAllViews() {
        newsView.classList.add("d-none");
        formView.classList.add("d-none");
        aboutView.classList.add("d-none");
    }

    function showNews() {
        hideAllViews();
        newsView.classList.remove("d-none");
    }

    function showForm(type) {
        hideAllViews();
        formView.classList.remove("d-none");

        if (type === "signup") {
            formView.innerHTML = `
                <h1>Formulario de Sign Up</h1>
                <form id="signupForm" class="row g-3">
                    <div class="col-md-6">
                        <label for="firstName">Nombres</label>
                        <input id="name" class="form-control" required placeholder="Ej: Pepito">
                    </div>
                    <div class="col-md-6">
                        <label for="lastName">Apellidos</label>
                        <input id="lastName" class="form-control" required placeholder="Ej: Pérez">
                    </div>
                    <div class="col-md-6">
                        <label for="email">Email</label>
                        <input id="email" type="email" class="form-control" required placeholder="Ej: pepito@ejemplo.com">
                    </div>
                    <div class="col-md-6">
                        <label for="phone">Teléfono</label>
                        <input id="phone" class="form-control" required placeholder="Ej: 3201112233">
                    </div>
                    <div class="col-md-6">
                        <label for="password">Contraseña</label>
                        <input id="password" type="password" minlength="6" class="form-control" required>
                    </div>
                    <div class="col-12 form-actions">
                        <button class="btn btn-success" type="submit" onclick="validarDatos()">Registrar</button>
                        <button class="btn btn-danger" type="button" data-view="noticias">Cancelar</button>
                    </div>
                </form>
            `;
            return;
        }

        formView.innerHTML = `
            <h1>Ingreso al sistema</h1>
            <form id="loginForm" class="login-form">
                <label for="username">Usuario</label>
                <input id="username" class="form-control mb-3" required>
                <label for="loginPassword">Clave</label>
                <input id="loginPassword" type="password" class="form-control mb-3" required>
                <div class="form-actions">
                    <button class="btn btn-primary" type="submit">Log In</button>
                    <button class="btn btn-outline-secondary" type="button" data-view="signup">Sign Up</button>
                    <button class="btn btn-outline-danger" type="button" data-view="noticias">Cancelar</button>
                </div>
            </form>
        `;
    }
    /*
    const regexText = /^[a-záéíóú\s]{2,50}$/i;
    const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;

    function validarDatos() {
    const errores = [];
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !lastName || !email ) {
        alert("Por favor, complete todos los campos.");
        return; 
    } 
    
    if (!regexText.test(name)) {
        errores.push("El nombre debe tener entre 2 y 50 letras.");
    }
    if (!regexText.test(lastName)) {
        errores.push("El apellido debe tener entre 2 y 50 letras.");
    }
    if (!regexEmail.test(email)) {
        errores.push("El correo no tiene un formato válido.");
    }


    if (errores.length > 0) {
        alert(errores.join("\n"));
    } else {
        alert(`Registro exitoso\n\nResumen de los datos:\n- Nombre: ${name}\n- Apellido: ${lastName}\n- Correo: ${email}`);
    }
    }
    */
    function renderAbout(type) {
        hideAllViews();
        aboutView.classList.remove("d-none");

        if (type === "equipo") {
            renderTeam();
            return;
        }

        const title = type === "mision" ? "Misión" : "Visión";
        const text = type === "mision"
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat."
            : "Construir un espacio informativo confiable, accesible y cercano para que las personas conozcan las noticias más importantes de su entorno.";

        aboutView.innerHTML = `
            <article class="about-panel">
                <h1>${title}</h1>
                <div class="about-content">
                    <div class="about-image">Image</div>
                    <div class="about-text">
                        <h2>${title}</h2>
                        <p>${text}</p>
                        <div class="about-actions">
                            <button class="control-button" type="button" data-action="font-size">
                                Cambiar tamaño de letra
                            </button>
                            <button class="control-button" type="button" data-action="font-color">
                                Cambiar color de letra
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    function renderTeam() {
        aboutView.innerHTML = `
            <section class="team-panel">
                <h1>Equipo de trabajo</h1>
                <div class="team-slider">
                    <button class="slider-button previous" type="button" data-slide="previous" aria-label="Empleado anterior">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    <div id="employeeSlides"></div>
                    <button class="slider-button next" type="button" data-slide="next" aria-label="Empleado siguiente">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
                <div class="slider-indicators" id="sliderIndicators"></div>
            </section>
        `;

        renderEmployee();
    }

    function renderEmployee() {
        const slides = document.querySelector("#employeeSlides");
        const indicators = document.querySelector("#sliderIndicators");

        slides.innerHTML = employees.map((employee, index) => `
            <article class="employee-slide ${index === employeeIndex ? "active" : ""}">
                <div class="employee-photo">${employee.photo}</div>
                <h2>${employee.name}</h2>
                <p>${employee.role}</p>
                <div class="social-links">
                    <a href="${employee.facebook}" target="_blank" rel="noopener" aria-label="Facebook">
                        <i class="bi bi-facebook"></i>
                    </a>
                    <a href="${employee.twitter}" target="_blank" rel="noopener" aria-label="Twitter">
                        <i class="bi bi-twitter"></i>
                    </a>
                    <a href="${employee.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <i class="bi bi-linkedin"></i>
                    </a>
                </div>
            </article>
        `).join("");

        indicators.innerHTML = employees.map((employee, index) => `
            <button class="${index === employeeIndex ? "active" : ""}" type="button" data-slide-to="${index}" aria-label="Mostrar empleado ${index + 1}"></button>
        `).join("");
    }

    function moveEmployee(direction) {
        employeeIndex = (employeeIndex + direction + employees.length) % employees.length;
        renderEmployee();
    }

    document.addEventListener("click", (event) => {
        const viewLink = event.target.closest("[data-view]");

        if (viewLink) {
            event.preventDefault();

            const view = viewLink.dataset.view;

            if (view === "noticias") {
                showNews();
            } else if (view === "admin" || view === "signup") {
                showForm(view);
            } else {
                renderAbout(view);
            }

            return;
        }

        const slideButton = event.target.closest("[data-slide]");

        if (slideButton) {
            const direction = slideButton.dataset.slide === "next" ? 1 : -1;
            moveEmployee(direction);
            return;
        }

        const indicator = event.target.closest("[data-slide-to]");

        if (indicator) {
            employeeIndex = Number(indicator.dataset.slideTo);
            renderEmployee();
            return;
        }

        const actionButton = event.target.closest("[data-action]");

        if (actionButton) {
            const aboutText = document.querySelector(".about-text");

            if (actionButton.dataset.action === "font-size") {
                aboutText.classList.toggle("large-text");
            } else {
                aboutText.classList.toggle("colored-text");
            }
        }
    });

    document.querySelector("#searchForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const searchText = document.querySelector("#searchInput").value;
        console.log(searchText);

        const normalizedText = searchText.toLowerCase().trim();

        cards.forEach((card) => {
            const title = card.dataset.title.toLowerCase();
            card.hidden = normalizedText !== "" && !title.includes(normalizedText);
        });
    });

    document.addEventListener("submit", (event) => {
        const regexText = /^[a-záéíóú\s]{2,50}$/i;
        const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i; 
        const regexPhone = /^\d{10,10}$/;
        const errores = [];
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !lastName || !email || !phone) {
        alert("Por favor, complete todos los campos.");
        return; 
    } 
    
    if (!regexText.test(name)) {
        errores.push("El nombre debe tener entre 2 y 50 letras.");
    }
    if (!regexText.test(lastName)) {
        errores.push("El apellido debe tener entre 2 y 50 letras.");
    }
    if (!regexEmail.test(email)) {
        errores.push("El correo no tiene un formato válido.");
    }
    if (!regexPhone.test(phone)) {
        errores.push("El número de teléfono debe tener 10 dígitos.");
    }

    if (errores.length > 0) {
        alert(errores.join("\n"));
    } else {
        alert(`Registro exitoso\n\nResumen de los datos:\n- Nombres: ${name}\n- Apellidos: ${lastName}\n- Correo: ${email}\n- Teléfono: ${phone}`);
    }
    });
});
