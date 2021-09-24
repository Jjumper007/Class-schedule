const checkbox = document.getElementById('checkbox')
let checked = false
checkbox.addEventListener('change', async()=>{
    checked = !checked
    if (checked){
        await fetch('http://localhost:8000/', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin',
        })
    }

})