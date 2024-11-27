
document.addEventListener("DOMContentLoaded", () => {
    const spanElement = document.querySelector("h1 span");

    // Trigger the transition after a small delay (optional)
    setTimeout(() => {
        spanElement.style.marginLeft = "-5px"; // Move to -5px
    }, 100); // Adjust delay if needed
});

document.querySelectorAll(".accordion-item").forEach((item, index, items) => {
    item.addEventListener("click", () => {
        activateAccordionItem(item, items);
    });
});

// Map to track timeouts for each accordion item
let titleTimeouts = new Map();

function activateAccordionItem(item, items) {
    // Remove "active" class from all items
    items.forEach((i) => {
        i.classList.remove("active");

        // Reset opacity and visibility immediately when deactivating
        const content = i.querySelector('.content');
        if (content) {
            content.style.opacity = 0;
            content.style.visibility = 'hidden'; // Hide the content immediately
        }

        // Reset the title to "Slide N" when item becomes inactive
        if (titleTimeouts.has(i)) {
            const titleElement = i.querySelector(".title");
            const originalTitle = `Slide ${i.dataset.index || Array.from(items).indexOf(i) + 1}`;
            titleElement.textContent = originalTitle;

            clearTimeout(titleTimeouts.get(i));
            titleTimeouts.delete(i);
        }
    });

    // Add "active" class to the clicked item
    item.classList.add("active");

    // Update the title text for all items
    updateAccordionTitles();

    // Delay the opacity transition for the content
    const content = item.querySelector('.content');
    if (content) {
        // Set a delay before making the content visible
        setTimeout(() => {
            content.style.visibility = 'visible'; // Ensure the content is visible
            content.style.transition = 'opacity 0.5s ease-in-out'; // Add transition effect
            content.style.opacity = 1; // Fade in the content
        }, 300); // Adjust the delay (300ms or as needed)
    }

    // Switch the title with the <h2> content after a delay
    const h2Element = item.querySelector("h2");
    const titleElement = item.querySelector(".title");
    if (h2Element && titleElement) {
        const h2Content = h2Element.textContent.trim();

        const timeout = setTimeout(() => {
            if (item.classList.contains("active")) {
                titleElement.textContent = h2Content; // Switch to h2 content
            }
        }, 1500); // 1.5 seconds delay

        titleTimeouts.set(item, timeout);
    }
}

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

// Initialize logic on page load
function initializeActiveAccordion() {
    const activeItem = document.querySelector(".accordion-item.active");
    if (activeItem) {
        const h2Element = activeItem.querySelector("h2");
        const titleElement = activeItem.querySelector(".title");
        if (h2Element && titleElement) {
            const h2Content = h2Element.textContent.trim();

            const timeout = setTimeout(() => {
                if (activeItem.classList.contains("active")) {
                    titleElement.textContent = h2Content; // Switch to h2 content
                }
            }, 3000); // 3 seconds delay

            titleTimeouts.set(activeItem, timeout);
        }
    }
}

// Run initialization on page load
initializeActiveAccordion();
updateAccordionTitles();

// Add spacebar key event listener for manual accordion change
document.addEventListener("keydown", (event) => {
    const popup = document.querySelector('.popup'); // Select the popup

    // Only prevent the spacebar action if the popup is visible
    if (popup && popup.classList.contains('visible')) {
        return; // Exit the function if popup is visible
    }

    if (event.code === "Space") {
        event.preventDefault(); // Prevent scrolling

        const activeItem = document.querySelector(".accordion-item.active");
        const items = document.querySelectorAll(".accordion-item");

        let nextIndex = 0; // Default to the first item if no active item is found
        if (activeItem) {
            const currentIndex = Array.from(items).indexOf(activeItem);
            nextIndex = (currentIndex + 1) % items.length; // Move to the next item, looping back to the first
        }

        activateAccordionItem(items[nextIndex], items); // Activate the next item
    }
});


function initializeSlider(sliderContainer) {
    const slides = sliderContainer.querySelectorAll('.slider img');
    let currentIndex = 0;

    function showNextSlide() {
        slides[currentIndex].classList.remove('active'); // Hide current slide
        currentIndex = (currentIndex + 1) % slides.length; // Move to the next slide
        slides[currentIndex].classList.add('active'); // Show the next slide
    }

    setInterval(showNextSlide, 7000); // Change slide every 7 seconds
}

// Get all slider containers and initialize each one
document.querySelectorAll('.slider-container').forEach(sliderContainer => {
    initializeSlider(sliderContainer);
});





document.addEventListener('DOMContentLoaded', () => {
    const popupButton = document.querySelector('.popup-toggle-button'); // Corrected selector
    const popup = document.querySelector('.popup');
    const closeButton = document.querySelector('.close-popup');
    console.log("ji",popupButton);
    // Show the popup when the button is clicked
    popupButton.addEventListener('click', () => {
        console.log("does it work"); // This will confirm if the event is being triggered
        popup.classList.add('visible');
    });

    // Hide the popup when the close button is clicked
    closeButton.addEventListener('click', () => {
        popup.classList.remove('visible');
    });
});
