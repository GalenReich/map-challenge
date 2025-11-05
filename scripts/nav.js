fetch('nav_manifest.json')
    .then((response) => response.json())
    .then((manifest) => {
        const navbar = document.getElementById('navbar')
        if (!navbar) return
        const ul = document.createElement('ul')

        Object.entries(manifest)
            .filter(([file]) => file.endsWith('.html'))
            .forEach(([file, label]) => {
                const li = document.createElement('li')
                const a = document.createElement('a')
                a.href = file
                a.textContent = label
                li.appendChild(a)
                ul.appendChild(li)
            })
        navbar.appendChild(ul)

        // --- Burger menu logic ---
        // Only add burger menu if not already present
        if (!document.getElementById('burger-menu')) {
            const burger = document.createElement('button')
            burger.id = 'burger-menu'
            burger.setAttribute('aria-label', 'Open navigation menu')
            burger.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `
            document.body.appendChild(burger)

            // Toggle nav visibility
            burger.addEventListener('click', () => {
                navbar.classList.toggle('open')
                document.body.classList.toggle('nav-open')
            })

            // Close nav when clicking outside or on a link (mobile)
            navbar.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navbar.classList.remove('open')
                    document.body.classList.remove('nav-open')
                }
            })
            document.addEventListener('click', (e) => {
                if (
                    window.innerWidth <= 800 &&
                    navbar.classList.contains('open') &&
                    !navbar.contains(e.target) &&
                    e.target !== burger
                ) {
                    navbar.classList.remove('open')
                    document.body.classList.remove('nav-open')
                }
            })
        }
    })
