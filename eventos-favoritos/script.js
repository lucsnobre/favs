/* Planify - Meus eventos favoritos
   JavaScript para funcionalidade da interface */

document.addEventListener('DOMContentLoaded', () => {
    const eventsGrid = document.getElementById('events-grid');
    const searchInput = document.getElementById('search-input');

    // Dados iniciais dos eventos, exatamente como na imagem
    const initialEvents = [
        {
            id: 1,
            name: 'DO RAP AO FUNK - ALEE E BAILE DO G',
            date: 'Sáb 16 de Mar',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cmFwLGNvbmNlcnR8fHx8fHwxNzE4NTc1MTAy&ixlib=rb-4.0.3&q=80&w=1080',
            isFavorite: true,
        },
        {
            id: 2,
            name: 'Show Nacional - MC Lele JP',
            date: 'Sáb 15 de Out',
            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2hvdyxjb25jZXJ0fHx8fHx8MTcxODU3NTEzMw&ixlib=rb-4.0.3&q=80&w=1080',
            isFavorite: true,
        },
        {
            id: 3,
            name: 'Show de Stand - Up Comedy',
            date: 'Qui 22 de Jun',
            image: 'https://images.unsplash.com/photo-1583795319569-5a8b94f5539b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c3RhbmQtdXAsY29tZWR5fHx8fHx8MTcxODU3NTE1OQ&ixlib=rb-4.0.3&q=80&w=1080',
            isFavorite: true,
        },
        {
            id: 4,
            name: 'Palestra Empreendedorismo - Online',
            date: 'Dom 25 de Maio',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGFsZXN0cmEsY29uZmVyZW5jZXx8fHx8fDE3MTg1NzUxODQ&ixlib=rb-4.0.3&q=80&w=1080',
            isFavorite: true,
        },
    ];

    let eventsData = [...initialEvents];

    /**
     * Renderiza os eventos na grade
     * @param {Array} eventsToRender - O array de eventos a ser renderizado
     */
    const renderEvents = (eventsToRender) => {
        eventsGrid.innerHTML = ''; // Limpa a grade antes de renderizar

        if (eventsToRender.length === 0) {
            eventsGrid.innerHTML = '<p>Nenhum evento encontrado.</p>';
            return;
        }

        eventsToRender.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.dataset.eventId = event.id;

            eventCard.innerHTML = `
                <div class="card-image-container">
                    <img src="${event.image}" alt="${event.name}" class="card-image">
                </div>
                <button class="fav-btn ${event.isFavorite ? 'favorited' : ''}">
                    <i class="fas fa-heart"></i>
                </button>
                <div class="card-content">
                    <h3>${event.name}</h3>
                    <div class="card-footer">
                        <p>${event.date}</p>
                        <button class="details-btn">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });
    };

    // --- Lógica de Eventos ---

    // Filtrar eventos ao digitar na busca
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEvents = eventsData.filter(event => 
            event.name.toLowerCase().includes(searchTerm)
        );
        renderEvents(filteredEvents);
    });

    // Lidar com cliques nos botões de favorito e detalhes (usando delegação de eventos)
    eventsGrid.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.fav-btn');
        const detailsBtn = e.target.closest('.details-btn');

        if (favBtn) {
            const card = favBtn.closest('.event-card');
            const eventId = parseInt(card.dataset.eventId);
            const event = eventsData.find(ev => ev.id === eventId);
            
            // Alterna o estado do favorito
            event.isFavorite = !event.isFavorite;
            favBtn.classList.toggle('favorited');
        }

        if (detailsBtn) {
            const card = detailsBtn.closest('.event-card');
            const eventName = card.querySelector('h3').textContent;
            console.log(`Abrindo detalhes do evento: ${eventName}`);
        }
    });

    // Renderização inicial
    renderEvents(eventsData);
}); 