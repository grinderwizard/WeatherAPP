document.addEventListener("DOMContentLoaded", function () {
    var result = document.querySelector(".result");
    infoGet();
    setInterval(infoGet, 1000 * 60 * 60);


    function infoGet() {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', true);
        xhttp.send();
        xhttp.addEventListener("readystatechange", function () {
            if (xhttp.status !== 200 && xhttp.readyState !== 4) {
                console.log("Error!", xhttp.status);
            } else {

                var list = JSON.parse(xhttp.responseText);
            var r = "1 USD = " + list[0].buy + " UAH </br>";
            r += "1 RUR = " + list[2].buy + " UAH </br>";
            r += "1 EUR = " + list[1].buy + " UAH </br>";
            result.innerHTML = r;
        }
        });
    }

    var x = document.querySelector(".result_your_city");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var geo = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=f3d3b1572334a5456ee9a28c951eeab2';
        var xhttp = new XMLHttpRequest();

        xhttp.open('GET', geo, true);
        xhttp.overrideMimeType("application/json");
        xhttp.send();
        xhttp.onload = function () {
            if (xhttp.status !== 200 && xhttp.status !== 0) {
                console.log("Error!", xhttp.status);
            } else {
                var list = JSON.parse(xhttp.responseText);
                console.log(list.name);
               var res = '<div>' + list.name + ' </div>' +
                    '<span class="info_Area_unit">Температура: ' + Math.round(list.main.temp - 273.15) + ' ℃</span>\n' +
                    '<span class="info_Area_unit">Видимость: ' + list.weather[0].description + '</span>' +
                    '<span class="info_Area_unit">Скорость ветра: ' + list.wind.speed + ' mph</span>' +
                    '<span class="info_Area_unit">Осадки: ' + list.main.humidity + ' %</span>';
                x.innerHTML = res;
            }

        }
    }
    getLocation();



        loadStorage();

    function loadStorage() {
        var arr = localStorage.getItem('cities');
        if (arr !== null) {
            arr = arr.split(',');
            console.log('MASS ' + arr.toString());

            for (var i = 0; i < arr.length; i++) {
                var dynDiv = document.createElement("div");
                dynDiv.id = 'div_' + arr[i];
                dynDiv.className = 'info_Area';
                dynDiv.innerHTML = localStorage.getItem(arr[i]);
                document.getElementById('result2').appendChild(dynDiv);
            }
        }

    }

    document.getElementById('get').addEventListener('click', getWeather);
    document.getElementById('del').addEventListener('click', del);

    // function all(event) {
    //     var className = event.target.id;
    //     console.log('className = ' + className);
    //     console.log('target = ' + event.target.getAttribute('info_Area'));
    //
    //     if (className === 'del') {
    //         del();
    //     }
    //
    //     if (className === 'get') {
    //         getWeather();
    //     }
    //
    // }

    function del() {
        console.log('*** ' + document.getElementById('del'));
        console.log('*** ' + document.getElementById('del').value);
        localStorage.clear();
        // var dynDiv = document.createElement("");
        // document.getElementById('result2').appendChild(dynDiv);
        window.location.reload();
    }

    function getWeather() {
        var res;
        var arr = localStorage.getItem('cities');
        if (arr !== null) {
            arr = arr.split(',');
        } else arr = [];

        var city = document.getElementById('city').value;

        if (city === '' || city === null) {
            console.log('Empty or null');
        } else {
            var xhttp = new XMLHttpRequest();
            xhttp.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=f3d3b1572334a5456ee9a28c951eeab2', true);
            xhttp.overrideMimeType("application/json");
            xhttp.send();
            xhttp.onload = function () {
                if (xhttp.status !== 200 && xhttp.status !== 0) {
                    console.log("Error!", xhttp.status);
                } else {
                    var list = JSON.parse(xhttp.responseText);
                    res = '<div>' + city + ' </div>' +
                        '<span class="info_Area_unit">Температура: ' + Math.round(list.main.temp - 273.15) + ' ℃</span>\n' +
                        '<span class="info_Area_unit">Видимость: ' + list.weather[0].description + '</span>' +
                        '<span class="info_Area_unit">Скорость ветра: ' + list.wind.speed + ' mph</span>' +
                        '<span class="info_Area_unit">Осадки: ' + list.main.humidity + ' %</span>';
                    // '<button class="info_Area_dell_unit" id="del" data-remove="">Удалить' +
                    // '<b class="non_display">' + city + '</b> </button>';

                    if (arr === null) {
                        arr[0] = city;
                        localStorage.setItem(city, res);
                        localStorage.setItem('cities', arr);

                        var dynDiv = document.createElement("div");
                        dynDiv.id = 'div_' + city;
                        dynDiv.className = 'info_Area';
                        dynDiv.innerHTML = res;
                        document.getElementById('result2').appendChild(dynDiv);
                    } else if (arr.includes(city)) {
                        console.log('Already have');
                        // var oldDiv = document.getElementById('div_' + city);
                        // oldDiv.className = 'non_display';
                    } else {
                        arr[arr.length] = city;
                        localStorage.setItem(city, res);
                        localStorage.setItem('cities', arr);

                        var dynDiv = document.createElement("div");
                        dynDiv.id = 'div_' + city;
                        dynDiv.className = 'info_Area';
                        dynDiv.innerHTML = res;
                        document.getElementById('result2').appendChild(dynDiv);
                    }
                }

            }
        }

        console.log('!!!! ' + this.res);

    }

    // document.getElementById('get').addEventListener('click', getWeather);
    //
    // document.getElementById('del').addEventListener('click', del);

});



