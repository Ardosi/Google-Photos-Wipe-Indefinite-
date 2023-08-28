// Configuration for element selectors. These are used to target specific elements on the webpage.
const ELEMENT_SELECTORS = {
    checkboxClass: '.ckGgle',  // Selector for image checkboxes
    languageAgnosticDeleteButton: 'div[data-delete-origin] button',  // Selector for the primary delete button
    deleteButton: 'button[aria-label="Delete"]',  // Fallback selector for the delete button
    confirmationButton: '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.V639qd.bvQPzd.oEOLpc.Up8vH.J9Nfi.A9Uzve.iWO5td > div.XfpsVe.J9fJmf > button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.nCP5yc.kHssdc.HvOprf'  // Selector for the delete confirmation button
};

// Time configuration settings in milliseconds.
// Adjust these values to modify the speed of the script.
const TIME_CONFIG = {
    delete_cycle: 10000,  // Time interval between each delete cycle. Decrease to make the script run faster.
    press_button_delay: 2000  // Delay between pressing the delete and confirmation buttons. Decrease to speed up button clicks.
};

let imageCount = 0;  // Counter to keep track of the number of images deleted.

// Function to handle the image deletion process.
const deleteImages = () => {
    // Select all image checkboxes.
    const checkboxes = document.querySelectorAll(ELEMENT_SELECTORS['checkboxClass']);
    
    // If no images are found, log a message and exit the function.
    if (!checkboxes.length) {
        console.log("[INFO] No more images to delete.");
        return;
    }

    // Update the image count and click on each checkbox to select images.
    imageCount += checkboxes.length;
    checkboxes.forEach(checkbox => checkbox.click());
    console.log("[INFO] Deleting", checkboxes.length, "images");

    // Delay before attempting to click the delete button.
    setTimeout(() => {
        // Try to select the primary delete button, if not found, select the fallback delete button.
        const deleteButton = document.querySelector(ELEMENT_SELECTORS['languageAgnosticDeleteButton']) || document.querySelector(ELEMENT_SELECTORS['deleteButton']);
        deleteButton?.click();

        // Delay before clicking the confirmation button to confirm the deletion.
        setTimeout(() => {
            const confirmationButton = document.querySelector(ELEMENT_SELECTORS['confirmationButton']);
            confirmationButton?.click();
            console.log(`[INFO] ${imageCount} Deleted`);
        }, TIME_CONFIG['press_button_delay']);
    }, TIME_CONFIG['press_button_delay']);
};

// Set an interval to repeatedly run the deleteImages function based on the delete_cycle time configuration.
setInterval(deleteImages, TIME_CONFIG['delete_cycle']);
