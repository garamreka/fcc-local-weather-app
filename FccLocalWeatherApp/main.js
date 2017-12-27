$(document).ready(function(){
    var latitude, longitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            
            getWeather(latitude, longitude);
        });
    }

    function getWeather(latitude, longitude) {
        var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
        
        $.get(url, function(data) {
            var city = data.name;
            var country = data.sys.country;
            var weatherId = data.weather[0].id;
            var weatherIcon = data.weather[0].icon; 
            var weatherDescription = data.weather[0].description;
            var temperatureInCelsius = data.main.temp; 
            $("#location").text(city + ", " + country);
            $("#description").text(weatherDescription);
            $("#icon").attr("src", weatherIcon) 
            
            SetBackgroundImage(weatherId);
            SwitchTemperature(temperatureInCelsius);
        })
    }
    
    function SetBackgroundImage(weatherId) {
        var backgroundImage;
        var clearSky = "https://afremov.com/image.php?type=P&id=17848";
        var clouds = "https://afremov.com/image.php?type=P&id=22370";
        var rain = "https://afremov.com/image.php?type=P&id=20878";
        var thunderStrom = "https://afremov.com/image.php?type=P&id=17753";
        var snow = "https://afremov.com/image.php?type=P&id=18584";
        var mist = "https://afremov.com/image.php?type=P&id=21858";
        var drizzle = "https://afremov.com/image.php?type=P&id=18367";
        var extreme = "https://afremov.com/image.php?type=P&id=21446";
        var breeze = "https://afremov.com/image.php?type=P&id=22841";
    
        if (weatherId >= 801 && weatherId <= 804) {
            backgroundImage = clouds;
        }
        else if (weatherId >= 500 && weatherId <= 531) {
            backgroundImage = rain;
        }
        else if (weatherId >= 200 && weatherId <= 232) {
            backgroundImage = thunderStrom;
        }
        else if (weatherId >= 600 && weatherId <= 632) {
            backgroundImage = snow;
        }
        else if (weatherId >= 700 && weatherId <= 781) {
            backgroundImage = mist;
        }
        else if (weatherId >= 300 && weatherId <= 321) {
            backgroundImage = drizzle;
        }
        else if (weatherId >= 900 && weatherId <= 906) {
            backgroundImage = extreme;
        }
        else if (weatherId >= 951 && weatherId <= 962) {
            backgroundImage = breeze;
        }
        else {
            backgroundImage = clearSky;
        }
        
        $("body").css("background-image", "url(" + backgroundImage + ")")   
    }

    function SwitchTemperature(temperatureInCelsius) {
        var fahrenheit = temperatureInCelsius * 9 / 5 + 32;
          
        $(".temperature").text(temperatureInCelsius + " °C");
        var isCelsius = true;

        $(".btn").click(function() {
            if (isCelsius === false) {
                isCelsius = true;
                $(".temperature").text(temperatureInCelsius + " °C");
            } else if (isCelsius === true) {
                isCelsius = false;
                $(".temperature").text(fahrenheit + " °F");
            }
        }) 
    }
});