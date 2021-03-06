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
        var clearSky = "https://afremov.com/images/product/image_173.jpeg";
        var clouds = "https://afremov.com/images/product/image_2784.jpeg";
        var rain = "https://afremov.com/images/product/RAINS_RUSTLE_3_1.jpg";
        var thunderStrom = "https://afremov.com/images/product/image_79.jpeg";
        var snow = "https://afremov.com/images/product/image_1080.jpeg";
        var mist = "https://afremov.com/images/product/FOGGY-MORNING.jpg";
        var drizzle = "https://afremov.com/images/product/image_684.jpeg";
        var extreme = "https://afremov.com/images/product/image_1436.jpeg";
        var breeze = "https://afremov.com/images/product/image_1184.jpeg";
    
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