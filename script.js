function myFunction() {
    document.getElementsByClassName(".checkbtn").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

input.onfocus = function () {
    tags.style.display = 'block';
    input.style.borderRadius = "5px 5px 0 0";
};
for (let option of tags.options) {
    option.onclick = function () {
        input.value = option.value;
        tags.style.display = 'none';
        input.style.borderRadius = "5px";
    }
};

input.oninput = function () {
    currentFocus = -1;
    var text = input.value.toUpperCase();
    for (let option of tags.options) {
        if (option.value.toUpperCase().indexOf(text) > -1) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    };
}
var currentFocus = -1;
input.onkeydown = function (e) {
    if (e.keyCode == 40) {
        currentFocus++
        addActive(tags.options);
    }
    else if (e.keyCode == 38) {
        currentFocus--
        addActive(tags.options);
    }
    else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
            if (tags.options) tags.options[currentFocus].click();
        }
    }
}

function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("active");
}
function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
    }
}

// countrycode dropdown

const info = document.querySelector(".alert-info");
function process(event) {
    event.preventDefault();
    const phoneNumber = phoneInput.getNumber();
    info.style.display = "";
    info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
}
function getIp(callback) {
    fetch('https://ipinfo.io/json?token=a6bdf13adc6c1d', { headers: { 'Accept': 'application/json' } })
        .then((resp) => resp.json())
        .catch(() => {
            return {
                country: 'us',
            };
        })
        .then((resp) => callback(resp.country));
}
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    // preferredCountries: ["in", "co", "us", "de"], if not using accesstoken
    initialCountry: "auto",
    geoIpLookup: getIp,
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});