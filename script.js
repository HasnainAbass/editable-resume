// Get form container elements
var resumeForm = document.getElementById('resume-form');
// Event listener for form submission
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form data by ides
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    var location = document.getElementById('location').value;
    var email = document.getElementById('email').value;
    var github = document.getElementById('github').value;
    var linkedin = document.getElementById('linkedin').value;
    var education = document.getElementById('education').value.split(',').map(function (edu) { return edu.trim(); });
    var skills = document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); });
    var workExperience = document.getElementById('work-experience').value;
    var profilePictureInput = document.getElementById('profile-picture');
    var profilePictureFile = profilePictureInput.files ? profilePictureInput.files[0] : null;
    if (!profilePictureFile) {
        alert("Please select a profile picture.");
        return;
    }
    // Profile picture handling with FileReader
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var imageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        // Generate resume HTML
        var resumeHTML = "\n            <div class=\"resume-container\">\n                <div id=\"inner-div\">\n                    <section class=\"Personal-info\">\n                        <div class=\"Information-box\">\n                            <h1 class=\"editable-text\"> ".concat(name, "</h1>\n                            <h2>Personal Information</h2>  \n                            <p><i class=\"fa-solid fa-phone\"></i> \n                            <span class=\"editable-text\"> +92").concat(contact, "</span></p>\n                            <p><i class=\"fa-solid fa-location-dot\"></i> \n                            <a href=\"#\" class=\"editable-text\"> ").concat(location, "</a></p>\n                            <p><i class=\"fa-regular fa-envelope\"></i> \n                            <a href=\"mailto:").concat(email, "\"> ").concat(email, "</a></p>\n                            <p><i class=\"fa-brands fa-github\"></i> \n                            <a href=\"").concat(github, "\"> ").concat(github, "</a></p>\n                            <p><i class=\"fa-brands fa-linkedin\"></i>\n                            <a href=\"").concat(linkedin, "\"> ").concat(linkedin, "</a></p>\n                        </div>\n                        <div id=\"Picture\">\n                            <img src=\"").concat(imageUrl, "\" alt=\"Profile Picture\" class=\"profile-picture\">\n                        </div>\n                    </section>\n                    <section class=\"education\">\n                        <h2>Education</h2>\n                        <ul>").concat(education.map(function (edu) { return "<li class=\"editable-text\">".concat(edu, "</li>"); }).join(''), "</ul>\n                    </section> \n                    <section class=\"skills\" id=\"skills-section\">\n                        <h2>Skills</h2>\n                        <ul>").concat(skills.map(function (skill) { return "<li class=\"editable-text\">".concat(skill, "</li>"); }).join(''), "</ul>\n                    </section>\n                    <section class=\"work-experience\">\n                        <h2>Work Experience</h2>\n                        <p class=\"editable-text\">").concat(workExperience, "</p>\n                    </section>\n                    <button id=\"toggle-education\">Toggle Education</button>\n                    <button id=\"toggle-skills\">Toggle Skills</button>\n                    <button id=\"toggle-experience\">Toggle Work Experience</button>\n                </div>\n            </div>\n        ");
        // Display generated resume
        var resumeContainer = document.createElement("div");
        resumeContainer.setAttribute("class", "resume-container");
        document.body.prepend(resumeContainer);
        resumeContainer.innerHTML = resumeHTML;
        // Hide form after generating resume
        var formContainer = document.querySelector(".form-container");
        formContainer.innerHTML = "";
        formContainer.style.visibility = "hidden";
        addToggleListeners();
        addEditListeners();
    };
    // Read file as Data URL to display in image tag
    reader.readAsDataURL(profilePictureFile);
});
// Function to toggle visibility of resume sections
function addToggleListeners() {
    var skillsSection = document.getElementById('skills-section');
    var educationSection = document.querySelector('.education');
    var workExperienceSection = document.querySelector('.work-experience');
    var toggleSkillsButton = document.getElementById('toggle-skills');
    var toggleEducationButton = document.getElementById('toggle-education');
    var toggleExperienceButton = document.getElementById('toggle-experience');
    // Toggle display function
    function toggleVisibility(element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
    // Add event listeners to toggle buttons
    toggleSkillsButton.addEventListener('click', function () { return toggleVisibility(skillsSection); });
    toggleEducationButton.addEventListener('click', function () { return toggleVisibility(educationSection); });
    toggleExperienceButton.addEventListener('click', function () { return toggleVisibility(workExperienceSection); });
}
// Function to add edit functionality to all editable sections
function addEditListeners() {
    var editableTexts = document.querySelectorAll('.editable-text');
    editableTexts.forEach(function (element) {
        element.addEventListener('click', function () { return makeEditable(element); });
    });
}
// Function to make a section editable and save changes
function makeEditable(element) {
    var originalContent = element.textContent || '';
    var input = document.createElement('input');
    input.type = 'text';
    input.value = originalContent;
    input.classList.add('editable');
    // Replace the text content with the input
    element.replaceWith(input);
    input.focus();
    // Add a save button to save the changes
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save changes';
    saveButton.classList.add('save-button');
    input.insertAdjacentElement('afterend', saveButton);
    // Save changes on button click or pressing Enter
    var saveChanges = function () {
        element.textContent = input.value;
        input.replaceWith(element);
        saveButton.remove();
    };
    saveButton.addEventListener('click', saveChanges);
    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter')
            saveChanges();
    });
}
