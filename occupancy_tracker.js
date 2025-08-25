// ================================
// OCCUPANCY TRACKER JAVASCRIPT
// ================================

// Sample data (replace with live API later if needed)
const places = [
  {
    id: 1,
    name: "Periyar Library",
    capacity: 240,
    occupied: 60,
  },
  {
    id: 2,
    name: "Outdoor Gym",
    capacity: 100,
    occupied: 85,
  },
  {
    id: 3,
    name: "Chillout Plaza Gym",
    capacity: 140,
    occupied: 80,
  }
];

// Initialize gauges
function initGauges() {
  document.querySelectorAll(".gauge").forEach((gauge, i) => {
    const place = places[i];
    if (!place) return;

    const percent = Math.round((place.occupied / place.capacity) * 100);

    // Update text values
    gauge.querySelector(".place").textContent = place.name;
    gauge.querySelector(".percent").textContent = `${percent}%`;
    gauge.querySelector(".fraction").innerHTML = `<b>${place.occupied}</b>/${place.capacity}`;

    // Update gauge arc
    const circle = gauge.querySelector(".progress");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = (percent / 100) * circumference;

    circle.setAttribute("stroke-dasharray", `${offset} ${circumference}`);
  });
}

// Handle "View more Information" button
function attachInfoListeners() {
  document.querySelectorAll(".info-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const place = places[i];
      alert(
        `${place.name}\n\nCapacity: ${place.capacity}\nOccupied: ${place.occupied}\nAvailable: ${place.capacity - place.occupied}`
      );
    });
  });
}

// Handle search filter
function attachSearch() {
  const searchInput = document.querySelector(".search");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".gauge").forEach((gauge, i) => {
      const placeName = places[i].name.toLowerCase();
      gauge.style.display = placeName.includes(query) ? "flex" : "none";
    });
  });
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  initGauges();
  attachInfoListeners();
  attachSearch();
});
