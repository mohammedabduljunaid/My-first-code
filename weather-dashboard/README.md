# 🌤️ Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from OpenWeatherMap API. View current conditions, detailed metrics, and a 5-day forecast for any city in the world.

## Features

✨ **Current Weather Display**
- Real-time temperature and weather conditions
- "Feels like" temperature
- Large weather icon visualization
- Location with country code
- Current date and time

📊 **Detailed Weather Metrics**
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility distance
- Maximum and minimum temperatures

🌅 **Sun Information**
- Sunrise and sunset times
- Cloudiness percentage
- Precipitation/rain data

📅 **5-Day Forecast**
- Daily high and low temperatures
- Weather icons for each day
- Weather description
- Easy-to-read card layout

🔍 **Search & Quick Access**
- Search any city in the world
- Quick city buttons (London, New York, Tokyo, Paris, Sydney)
- Real-time search suggestions
- Error handling for invalid cities

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mohammedabduljunaid/My-first-code.git
cd My-first-code/weather-dashboard
```

2. Open `index.html` in your web browser

That's it! No build process or dependencies required.

## How to Use

1. **Search for a City**:
   - Type a city name in the search box
   - Press Enter or click the search button
   - Weather data loads automatically

2. **Use Quick Cities**:
   - Click any quick city button (London, New York, Tokyo, Paris, Sydney)
   - Instant weather data for that city

3. **View Detailed Information**:
   - Current weather card shows main conditions
   - Detailed metrics grid shows specific data points
   - Forecast section shows 5-day outlook
   - Additional info shows sunrise/sunset and precipitation

## Files

- `index.html` - HTML structure and layout
- `style.css` - Styling, animations, and responsive design
- `app.js` - Weather API integration and logic
- `README.md` - Documentation

## API Information

**Service**: OpenWeatherMap API (Free Tier)
- **Base URL**: `https://api.openweathermap.org`
- **Endpoints**:
  - Current Weather: `/data/2.5/weather`
  - 5-Day Forecast: `/data/2.5/forecast`

**Features**:
- Real-time weather data
- Global coverage
- Multiple data points per request
- Free tier supports unlimited API calls

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Flexbox, Grid, Animations
- **JavaScript (Vanilla)** - API integration and DOM manipulation
- **OpenWeatherMap API** - Weather data source
- **Font Awesome Icons** - UI icons

## Weather Data Points

The dashboard displays:
- Temperature (current, feels like, min, max)
- Weather description
- Humidity
- Wind speed
- Atmospheric pressure
- Visibility
- Cloudiness
- Sunrise and sunset times
- Precipitation data
- Weather icons

## Responsive Design

- **Desktop**: Full multi-column layout
- **Tablet**: Adjusted grid columns
- **Mobile**: Stacked single column layout
- Touch-friendly buttons and inputs

## Browser Compatibility

Works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Error Handling

- Invalid city names show error message
- Network errors are caught and displayed
- Loading spinner during data fetch
- User-friendly error messages

## Future Enhancements

- Geolocation support (current location)
- Weather alerts and warnings
- Multiple city comparison
- Hourly forecast
- Weather history/trends
- Dark/Light theme toggle
- Weather maps
- Severe weather warnings
- Air quality index
- UV index
- Pollen count
- Favorites/Saved cities
- Export weather data

## Performance

- Lazy loading of images
- Optimized API calls
- Minimal JavaScript
- CSS animations
- Responsive images

## Troubleshooting

**"City not found" error**
- Ensure city name is spelled correctly
- Use English city names
- Try with country code (e.g., "London, UK")

**No data displays**
- Check internet connection
- Verify browser developer console for errors
- Ensure JavaScript is enabled

**Slow loading**
- Wait for API response
- Check internet speed
- API rate limits apply

## License

Open source - feel free to modify and enhance!

## Contributing

Want to improve the dashboard? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions:
- Check the troubleshooting section
- Review the code comments
- Check OpenWeatherMap API docs

Enjoy! 🌤️☀️⛅