function initMap() {
  console.log("Google Maps API loaded");
  initGeo();
}

function initGeo() {
  const locationDiv = document.getElementById("location");
  const geoSpans = document.getElementsByClassName("geo");
  if (!locationDiv && geoSpans.length === 0) {
    console.log("Location elements not found");
    return;
  }

  console.log("Initializing geolocation...");
  getCityByIP();
}

async function getCityByIP() {
  const locationDiv = document.getElementById("location");
  const geoSpans = document.getElementsByClassName("geo");
  try {
    console.log("Fetching location data...");
    // Пробуем сначала ipapi.co
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const data = await response.json();
        console.log("Location data received:", data);
        if (data.city) {
          if (locationDiv) locationDiv.textContent = data.city;
          for (let span of geoSpans) {
            span.textContent = data.city;
          }
          return;
        }
      }
    } catch (error) {
      console.log("ipapi.co failed, trying alternative API...");
    }

    // Если ipapi.co не сработал, пробуем ip-api.com
    const response = await fetch("http://ip-api.com/json/");
    if (response.ok) {
      const data = await response.json();
      console.log("Location data received:", data);
      if (data.city) {
        if (locationDiv) locationDiv.textContent = data.city;
        for (let span of geoSpans) {
          span.textContent = data.city;
        }
        return;
      }
    }

    // Если оба API не сработали, используем значение по умолчанию
    console.log("All APIs failed, using default");
    if (locationDiv) locationDiv.textContent = "USA";
    for (let span of geoSpans) {
      span.textContent = "USA";
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    if (locationDiv) locationDiv.textContent = "USA";
    for (let span of geoSpans) {
      span.textContent = "USA";
    }
  }
}
