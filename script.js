document.querySelectorAll(".accordion-item").forEach((item) => {
    item.addEventListener("click", () => {
        // Remove "active" class from all items
        document.querySelectorAll(".accordion-item").forEach((i) => i.classList.remove("active"));

        // Add "active" class to the clicked item
        item.classList.add("active");

        // Update the title text for all items
        updateAccordionTitles();
    });
});

// Function to update the title based on the active state
function updateAccordionTitles() {
    document.querySelectorAll(".accordion-item").forEach((item) => {
        const titleElement = item.querySelector(".title");
        const titleText = titleElement.textContent.trim();

        if (!item.classList.contains("active")) {
            // Only modify the title if it's not active
            const lastSpaceIndex = titleText.lastIndexOf(" "); // Find the last space
            if (lastSpaceIndex !== -1) {
                titleElement.textContent = titleText.slice(lastSpaceIndex + 1); // Keep only the number after the last space
            }
        } else {
            // Keep the full title for active items
            titleElement.textContent = `Slide ${titleText.split(" ").pop()}`; // Full title with "Slide X"
        }
    });
}

// Initialize title trimming on page load
updateAccordionTitles();


let currentIndex = 0;
const images = document.querySelectorAll('.slider img');
const totalImages = images.length;

function changeSlide() {
    images.forEach((image, index) => {
        image.classList.remove('active');
    });
    currentIndex = (currentIndex + 1) % totalImages;
    images[currentIndex].classList.add('active');
}

setInterval(changeSlide, 5000); // Change image every 5 seconds
changeSlide(); // Initialize the first slide
