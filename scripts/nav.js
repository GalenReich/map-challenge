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
    })
