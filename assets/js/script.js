const baseUrl = "https://covid-193.p.rapidapi.com/statistics";

async function fetchDataByCountry(country) {
  // Clear the data elements
  clearDataElement();

  const url = `${baseUrl}?country=${country}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "94a56e86d7mshcfab305ae016d14p1759f1jsn4604c082ab7e",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      if (data.results === 0) {
        displayError("Sorry, your data was not found");
      } else {
        const statistics = data.response[0];
        updateDataElements(statistics);
        clearError();
      }
    } else {
      console.error("Error fetching data:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function clearDataElement() {
  // Clear the data elements
  document.getElementById("country").textContent = "";
  document.getElementById("continent").textContent = "";
  document.getElementById("day").textContent = "";
  document.getElementById("active").textContent = "";
  document.getElementById("cases").textContent = "";
  document.getElementById("critical").textContent = "";
  document.getElementById("deaths").textContent = "";
  document.getElementById("recovered").textContent = "";
  document.getElementById("tests").textContent = "";
}

function displayError(message) {
  const errorAlert = document.getElementById("error");
  errorAlert.innerHTML =
    '<i class="fa-solid fa-circle-exclamation fa-beat"></i> ' + message;
  errorAlert.classList.add("fade-in");
  errorAlert.style.display = "block";

  // Time to fade
  setTimeout(() => {
    errorAlert.classList.add("active");
  }, 25);
}

function clearError() {
  const errorAlert = document.getElementById("error");
  errorAlert.textContent = "";
  errorAlert.style.display = "none";
}

function updateDataElements(statistics) {
  // Update the data elements
  document.getElementById("country").textContent = statistics.country;
  document.getElementById("continent").textContent = statistics.continent;
  document.getElementById("day").textContent = formatDate(statistics.day);
  document.getElementById("active").textContent =
    statistics.cases.active?.toLocaleString() ?? "-/N/A";
  document.getElementById("cases").textContent =
    statistics.cases.total?.toLocaleString() ?? "-/N/A";
  document.getElementById("critical").textContent =
    statistics.cases.critical?.toLocaleString() ?? "-/N/A";
  document.getElementById("deaths").textContent =
    statistics.deaths.total?.toLocaleString() ?? "-/N/A";
  document.getElementById("recovered").textContent =
    statistics.cases.recovered?.toLocaleString() ?? "-/N/A";
  document.getElementById("tests").textContent =
    statistics.tests.total?.toLocaleString() ?? "-/N/A";
}

function handleSubmitSearch(event) {
  event.preventDefault();
  const country = document.getElementById("countryInput").value;
  document.getElementById("countryInput").value = "";
  fetchDataByCountry(country);
}

// validation date
function formatDate(dateString) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const today = new Date(dateString).toLocaleDateString(undefined, options);
  return today;
}

// your form
var form = document.getElementById("search");

// attach event listener
form.addEventListener("submit", handleSubmitSearch, true);
