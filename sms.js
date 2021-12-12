var CITY_TO_NUMBER = {
  "臺北市":"0911510914",
  "新北市":"0912095110",
  "臺中市":"0911510915",
  "臺南市":"0911510916",
  "高雄市":"0911510917",
  "桃園市":"0917110880",
  "基隆市":"0911510918",
  "新竹市":"0911510919",
  "嘉義市":"0911510920",
  "新竹縣":"0911510921",
  "苗栗縣":"0911510922",
  "彰化縣":"0911510933",
  "南投縣":"0911510923",
  "雲林縣":"0911510924",
  "嘉義縣":"0911510925",
  "屏東縣":"0911510926",
  "宜蘭縣":"0911510927",
  "花蓮縣":"0911510928",
  "臺東縣":"0911510929",
  "澎湖縣":"0911510930",
  "金門縣":"0911510931",
  "連江縣":"0911510932",
};

var ENDING = [
  "敬請派員協助處理，謝謝。",
  "請立即協助排除，謝謝。",
  "請依規定派員移除，謝謝。",
];

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

function setupRandomEnding() {
  document.getElementById('ending').value = ENDING.sample();
}

function setupSMSNumberAndCity(number, city) {
  document.getElementById("smsNumber").value = number;
}

function getSMSNumberByCity(city, callback) {
  callback(CITY_TO_NUMBER[city], city);
}

function getCityByLatLonCallback(xml, callback) {
  getSMSNumberByCity(
    xml.getElementsByTagName('ctyName')[0].textContent,
    callback
  );
}

function getCityByLatLon(lat, lon, callback) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    getCityByLatLonCallback(this.responseXML, callback);
  });
  oReq.open("GET",
            "https://api.nlsc.gov.tw/other/TownVillagePointQuery/"
            + lon + "/" + lat + "/4326");
  oReq.send();
}

function setLatLon(lat, lon) {
  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = lon;
}

function processPosition(position) {
  getCityByLatLon(position.coords.latitude,
                  position.coords.longitude,
                  setupSMSNumberAndCity);

  setLatLon(position.coords.latitude,
            position.coords.longitude);
}

function requestLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(processPosition);
  }
}


function prepareSMSBody() {
  var plate = document.getElementById('licensePlate').value;
  var main = document.getElementById('mainText').value;
  var ending = document.getElementById('ending').value;
  var lat = document.getElementById('latitude').value;
  var lon = document.getElementById('longitude').value;

  return `您好，車牌號碼 ${plate} ${main} ${ending} 座標: ${lat}, ${lon}`
}

function prepareSMS() {
  var number = document.getElementById('smsNumber').value;
  var sms = encodeURI(prepareSMSBody());
  console.log(prepareSMSBody());

  var prefix = `sms://${number}/`;
  var body = `body=${sms}`;

  if(navigator.userAgent.match(/iPhone/i)) {
    return `${prefix}&${body}`;
  }
  return `${prefix}?${body}`;
}

function sendSMS() {
  var sms = prepareSMS();
  console.log(sms);
  window.open(sms,'_blank');
}
