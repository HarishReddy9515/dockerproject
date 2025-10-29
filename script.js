// Sample movie data
const movies = [
    {
        id: 1,
        title: "Avatar: The Way of Water",
        genre: "Sci-Fi, Adventure",
        rating: 8.1,
        poster: "https://via.placeholder.com/300x400/667eea/white?text=Avatar+2",
        duration: "3h 12m",
        language: "English",
        director: "James Cameron",
        cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
        synopsis: "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their planet."
    },
    {
        id: 2,
        title: "Pathaan",
        genre: "Action, Thriller",
        rating: 7.8,
        poster: "https://via.placeholder.com/300x400/dc3545/white?text=Pathaan",
        duration: "2h 26m",
        language: "Hindi",
        director: "Siddharth Anand",
        cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
        synopsis: "An Indian spy takes on the leader of a group of mercenaries who have a heinous plot for his country."
    },
    {
        id: 3,
        title: "Avengers: Endgame",
        genre: "Action, Adventure",
        rating: 8.4,
        poster: "https://via.placeholder.com/300x400/ffc107/333?text=Avengers",
        duration: "3h 1m",
        language: "English",
        director: "Anthony Russo, Joe Russo",
        cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
        synopsis: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe."
    },
    {
        id: 4,
        title: "Kantara",
        genre: "Action, Drama",
        rating: 8.7,
        poster: "https://via.placeholder.com/300x400/28a745/white?text=Kantara",
        duration: "2h 28m",
        language: "Kannada",
        director: "Rishab Shetty",
        cast: ["Rishab Shetty", "Sapthami Gowda", "Kishore Kumar G"],
        synopsis: "A village demigod and a forest officer clash over a piece of land, leading to a tense and dramatic confrontation."
    }
];

const comingSoonMovies = [
    {
        id: 5,
        title: "Guardians of the Galaxy Vol. 3",
        genre: "Action, Comedy",
        rating: 0,
        poster: "https://via.placeholder.com/300x400/6f42c1/white?text=Guardians+3",
        releaseDate: "May 5, 2024"
    },
    {
        id: 6,
        title: "Fast X",
        genre: "Action, Thriller",
        rating: 0,
        poster: "https://via.placeholder.com/300x400/fd7e14/white?text=Fast+X",
        releaseDate: "May 19, 2024"
    }
];

// Theater data
const theaters = [
    {
        id: 1,
        name: "PVR ICON: Oberon Mall",
        location: "Andheri West, Mumbai",
        shows: ["10:00 AM", "1:30 PM", "4:45 PM", "8:00 PM", "11:15 PM"]
    },
    {
        id: 2,
        name: "INOX: Megaplex",
        location: "Malad West, Mumbai",
        shows: ["10:30 AM", "2:00 PM", "5:15 PM", "8:30 PM"]
    },
    {
        id: 3,
        name: "Cinepolis: Viviana Mall",
        location: "Thane West, Mumbai",
        shows: ["11:00 AM", "2:30 PM", "6:00 PM", "9:15 PM"]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    loadComingSoonMovies();
    setupEventListeners();
});

// Load now showing movies
function loadMovies() {
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// Load coming soon movies
function loadComingSoonMovies() {
    const comingSoonGrid = document.getElementById('comingSoonGrid');
    comingSoonGrid.innerHTML = '';

    comingSoonMovies.forEach(movie => {
        const movieCard = createMovieCard(movie, true);
        comingSoonGrid.appendChild(movieCard);
    });
}

// Create movie card element
function createMovieCard(movie, isComingSoon = false) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-genre">${movie.genre}</div>
            <div class="movie-rating">
                ${movie.rating ? `<div class="rating">⭐ ${movie.rating}/10</div>` : '<div class="rating">Coming Soon</div>'}
                ${!isComingSoon ? '<button class="btn-book" onclick="openMovieDetails(' + movie.id + ')">Book Now</button>' : ''}
            </div>
        </div>
    `;
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterMovies(searchTerm);
    });
}

// Filter movies based on search
function filterMovies(searchTerm) {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        const title = card.querySelector('.movie-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open movie details modal
function openMovieDetails(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    const modal = document.getElementById('movieModal');
    const detailsContainer = document.getElementById('movieDetails');
    
    detailsContainer.innerHTML = `
        <div class="movie-details">
            <div class="movie-details-poster">
                <img src="${movie.poster}" alt="${movie.title}">
            </div>
            <div class="movie-details-info">
                <h2 class="movie-details-title">${movie.title}</h2>
                <div class="movie-details-meta">
                    <div class="meta-item">
                        <span class="meta-label">Duration</span>
                        <span class="meta-value">${movie.duration}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Language</span>
                        <span class="meta-value">${movie.language}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Rating</span>
                        <span class="meta-value">⭐ ${movie.rating}/10</span>
                    </div>
                </div>
                <div class="movie-synopsis">
                    <h3>Synopsis</h3>
                    <p>${movie.synopsis}</p>
                </div>
                <div class="movie-cast">
                    <h3>Cast</h3>
                    <p>${movie.cast.join(', ')}</p>
                </div>
                <div class="movie-director">
                    <h3>Director</h3>
                    <p>${movie.director}</p>
                </div>
                <button class="btn-book" onclick="startBooking(${movie.id})" style="margin-top: 1rem; padding: 1rem 2rem; font-size: 1.1rem;">
                    Book Tickets
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Start booking process
function startBooking(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    // Close movie details modal
    document.getElementById('movieModal').style.display = 'none';
    
    // Open booking modal
    const bookingModal = document.getElementById('bookingModal');
    const bookingDetails = document.getElementById('bookingDetails');
    
    bookingDetails.innerHTML = `
        <div class="booking-process">
            <h2>Book Tickets - ${movie.title}</h2>
            <div class="booking-steps">
                <div class="step" id="stepTheater">
                    <h3 class="step-title">1. Select Theater & Showtime</h3>
                    <div class="theaters-list" id="theatersList">
                        ${generateTheatersList()}
                    </div>
                </div>
                <div class="step" id="stepSeats" style="display: none;">
                    <h3 class="step-title">2. Select Seats</h3>
                    <div class="seat-selection" id="seatSelection">
                        <!-- Seat selection will be loaded here -->
                    </div>
                </div>
                <div class="step" id="stepSummary" style="display: none;">
                    <h3 class="step-title">3. Confirm Booking</h3>
                    <div class="booking-summary" id="bookingSummary">
                        <!-- Booking summary will be loaded here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    bookingModal.style.display = 'block';
    setupBookingEventListeners(movie);
}

// Generate theaters list HTML
function generateTheatersList() {
    return theaters.map(theater => `
        <div class="theater-item" onclick="selectTheater(${theater.id})">
            <div class="theater-name">${theater.name}</div>
            <div class="theater-location">${theater.location}</div>
            <div class="show-times">
                ${theater.shows.map(show => `
                    <div class="show-time" onclick="event.stopPropagation(); selectShowTime('${show}', ${theater.id})">
                        ${show}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Select theater
function selectTheater(theaterId) {
    const theaterItems = document.querySelectorAll('.theater-item');
    theaterItems.forEach(item => item.style.background = '#f8f9fa');
    
    const selectedTheater = document.querySelector(`.theater-item[onclick="selectTheater(${theaterId})"]`);
    if (selectedTheater) {
        selectedTheater.style.background = '#e3f2fd';
    }
}

// Select show time
function selectShowTime(showTime, theaterId) {
    // Store selection
    window.selectedShow = {
        time: showTime,
        theaterId: theaterId,
        theater: theaters.find(t => t.id === theaterId)
    };
    
    // Move to seat selection
    document.getElementById('stepTheater').style.display = 'none';
    document.getElementById('stepSeats').style.display = 'block';
    
    // Generate seat map
    generateSeatMap();
}

// Generate seat map
function generateSeatMap() {
    const seatSelection = document.getElementById('seatSelection');
    const rows = 6;
    const seatsPerRow = 8;
    
    let seatMapHTML = `
        <div class="seat-map">
            <div class="screen">SCREEN</div>
            <div class="seats-container">
    `;
    
    for (let row = 0; row < rows; row++) {
        const rowLetter = String.fromCharCode(65 + row); // A, B, C, etc.
        seatMapHTML += `<div class="seat-row">`;
        seatMapHTML += `<div class="row-label">${rowLetter}</div>`;
        
        for (let seat = 1; seat <= seatsPerRow; seat++) {
            const seatId = `${rowLetter}${seat}`;
            // Randomly mark some seats as occupied for demo
            const isOccupied = Math.random() < 0.3;
            seatMapHTML += `
                <div class="seat ${isOccupied ? 'occupied' : 'available'}" 
                     onclick="selectSeat('${seatId}', this)" 
                     id="seat-${seatId}">
                    ${seat}
                </div>
            `;
        }
        
        seatMapHTML += `</div>`;
    }
    
    seatMapHTML += `
            </div>
            <div class="seat-legend" style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 20px; height: 20px; background: #28a745; border-radius: 3px;"></div>
                    <span>Available</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 20px; height: 20px; background: #dc3545; border-radius: 3px;"></div>
                    <span>Occupied</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 20px; height: 20px; background: #007bff; border-radius: 3px;"></div>
                    <span>Selected</span>
                </div>
            </div>
            <button class="btn-confirm" onclick="proceedToSummary()" style="margin-top: 2rem;">
                Proceed to Payment
            </button>
        </div>
    `;
    
    seatSelection.innerHTML = seatMapHTML;
}

// Select seat
function selectSeat(seatId, element) {
    if (element.classList.contains('occupied')) return;
    
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        // Remove from selected seats
        window.selectedSeats = window.selectedSeats.filter(seat => seat !== seatId);
    } else {
        element.classList.add('selected');
        // Add to selected seats
        if (!window.selectedSeats) window.selectedSeats = [];
        window.selectedSeats.push(seatId);
    }
}

// Proceed to summary
function proceedToSummary() {
    if (!window.selectedSeats || window.selectedSeats.length === 0) {
        alert('Please select at least one seat');
        return;
    }
    
    document.getElementById('stepSeats').style.display = 'none';
    document.getElementById('stepSummary').style.display = 'block';
    
    generateBookingSummary();
}

// Generate booking summary
function generateBookingSummary() {
    const bookingSummary = document.getElementById('bookingSummary');
    const ticketPrice = 250;
    const total = window.selectedSeats.length * ticketPrice;
    const convenienceFee = 40;
    const finalTotal = total + convenienceFee;
    
    bookingSummary.innerHTML = `
        <h3>Booking Details</h3>
        <div class="summary-item">
            <span>Movie:</span>
            <span>Avatar: The Way of Water</span>
        </div>
        <div class="summary-item">
            <span>Theater:</span>
            <span>${window.selectedShow.theater.name}</span>
        </div>
        <div class="summary-item">
            <span>Show Time:</span>
            <span>${window.selectedShow.time}</span>
        </div>
        <div class="summary-item">
            <span>Seats:</span>
            <span>${window.selectedSeats.join(', ')}</span>
        </div>
        <div class="summary-item">
            <span>Tickets (${window.selectedSeats.length} x ₹${ticketPrice}):</span>
            <span>₹${total}</span>
        </div>
        <div class="summary-item">
            <span>Convenience Fee:</span>
            <span>₹${convenienceFee}</span>
        </div>
        <div class="summary-item summary-total">
            <span>Total Amount:</span>
            <span>₹${finalTotal}</span>
        </div>
        <button class="btn-confirm" onclick="confirmBooking()">
            Confirm & Pay ₹${finalTotal}
        </button>
    `;
}

// Confirm booking
function confirmBooking() {
    alert('Booking Confirmed! Your tickets have been booked successfully.');
    document.getElementById('bookingModal').style.display = 'none';
    
    // Reset booking data
    window.selectedSeats = [];
    window.selectedShow = null;
}

// Setup booking event listeners
function setupBookingEventListeners(movie) {
    // This function can be expanded for more complex booking interactions
}
