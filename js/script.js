fetch('https://randomuser.me/api/?nat=us&results=12')
  .then((response) => {
    return response.json()
  })
  .then(data => {
    createGallery(data)
  })

function createGallery (data) {
  data.results.forEach((entry) => {
    const card = document.createElement('DIV')
    card.className = 'card'

    const cardHTML =
      `<div class="card-img-container">
            <img class="card-img" src="${entry.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${entry.name.first} ${entry.name.last}</h3>
            <p class="card-text">${entry.email}</p>
            <p class="card-text cap">${entry.location.city}</p>
        </div>`

    card.insertAdjacentHTML('beforeend', cardHTML)

    // Event listener for modal window creation
    card.addEventListener('click', () =>
      createModal(entry))

    document.querySelector('#gallery').insertAdjacentElement('beforeend', card)
  })
}

function createModal (employee) {
  const modal = document.createElement('DIV')
  modal.className = 'modal-container'

  const dob = employee.dob.date
  const modalHTML = `<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="modal-text">${employee.email}</p>
        <p class="modal-text cap">${employee.location.city}</p>
        <hr>
        <p class="modal-text">${employee.cell.replace(/-/, ' ')}</p>
        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}
      <br>${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
    <p class="modal-text">Birthday: ${dob.substr(5, 2)}/${dob.substr(8, 2)}/${dob.substr(2, 2)}</p>
    </div>
</div>
</div>`

  modal.insertAdjacentHTML('beforeend', modalHTML)
  document.body.insertAdjacentElement('beforeend', modal)

  // remove modal element with an event listener
  document.querySelector('#modal-close-btn').addEventListener('click', () => {
    modal.remove()
  })
}
