const getLocation = async () => {
  const url = "http://ip-api.com/json/?fields=country,city,lat,lon,timezone";

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const getWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f0894defae7c5584798f8812232a40c2`;

  // `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6b51c75f2123b25efb620a752b42739c`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

function dayOrNight() {
  let dayNight;
  let date = new Date();

  if (date.getHours() > 6 && date.getHours() <= 20) {
    return (dayNight = "DAY 🌝");
  } else {
    return (dayNight = "NIGHT 🌚");
  }
}

function getStickers(stickers) {
  let mySticker;
  switch (stickers) {
    case "Thunderstorm":
      mySticker = "🌪";
      break;
    case "Drizzle":
      mySticker = "🌧";
      break;
    case "Rain":
      mySticker = "🌧";
      break;
    case "Snow":
      mySticker = "🌨";
      break;
    case "Clear":
      const DOrN = dayOrNight();
      mySticker = ` ${DOrN}`;
      //  console.log(dayOrNight());
      break;
    case "Clouds":
      mySticker = "☁";
      break;
    case "Atmosphere":
      mySticker = "🌫";
      break;
  }
  return mySticker;
}

function getTemperture(temperture) {
  const k = temperture;
  const f = ((k - 273.15) * 9) / 5 + 32;
  const c = k - 273.15;

  return (temp = {
    kelvin: Math.floor(k),
    farenhight: Math.floor(f),
    cantigerad: Math.floor(c),
  });
}

const loti = document.querySelector(".timezone");
const stick = document.querySelector(".stickerr");
const dese = document.querySelector(".degree-section");
const deg = document.querySelector(".degree");
const unit = document.querySelector(".degree-section span");
const tede = document.querySelector(".temp-description");

getLocation()
  .then((locData) => {
    const timezone = locData.timezone;

    loti.textContent = timezone;
    return getWeather(locData.lat, locData.lon);
  })
  .then((weData) => {
    const temperture = weData.main.temp;
    const stickers = weData.weather[0].main;
    const weDes = weData.weather[0].description;

    const stickerName = getStickers(stickers);

    // stick.innerHTML=`<p ${stickerName} '></p>`

    const p = document.createElement("p");
    stick.append(p);
    p.textContent = stickerName;

    deg.textContent = Math.floor(temperture);
    unit.textContent = "K";

    dese.addEventListener("click", (e) => {
      if (unit.textContent === "K") {
        deg.textContent = getTemperture(temperture).farenhight;
        unit.textContent = "F";
      } else if (unit.textContent === "F") {
        deg.textContent = getTemperture(temperture).cantigerad;
        unit.textContent = "C";
      } else {
        deg.textContent = getTemperture(temperture).kelvin;
        unit.textContent = "K";
      }
    });

    tede.textContent = weDes;
  });
