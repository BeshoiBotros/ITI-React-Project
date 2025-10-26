import { useState, useEffect } from "react";
import { 
  MapPin, 
  CloudSun, 
  Wind, 
  Droplets, 
  Eye, 
  Gauge, 
  Thermometer,
  CloudRain,
  AlertCircle
} from "lucide-react";

import type { Weather as WeatherData } from "../types";

const API_KEY = "aa9877d85b324c18966135657231402";

async function fetchWeather(city: string): Promise<WeatherData> {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
}

export default function Weather() {
  const [city, setCity] = useState('cairo');
  const [searchInput, setSearchInput] = useState('cairo');
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    fetchWeather(city)
      .then(weatherData => {
        setData(weatherData);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [city]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 p-8 flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl p-12">
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-base-content font-medium">Loading weather data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 p-8 flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl p-12 max-w-md">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="w-16 h-16 text-error" />
            <h2 className="text-2xl font-bold">Unable to fetch weather</h2>
            <p className="text-base-content/70">{error.message}</p>
            <button 
              onClick={() => setCity('cairo')}
              className="btn btn-error mt-4"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getAQIStatus = (pm25: number) => {
    if (pm25 <= 12) return { text: 'Good', badge: 'badge-success' };
    if (pm25 <= 35.4) return { text: 'Moderate', badge: 'badge-warning' };
    if (pm25 <= 55.4) return { text: 'Unhealthy for Sensitive', badge: 'badge-warning' };
    if (pm25 <= 150.4) return { text: 'Unhealthy', badge: 'badge-error' };
    return { text: 'Very Unhealthy', badge: 'badge-error' };
  };

  const aqiStatus = data.current.air_quality ? getAQIStatus(data.current.air_quality.pm2_5) : null;

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Weather Dashboard</h1>
        </div>

        <div className="card bg-base-100 shadow-xl p-6 mb-8">
          <div className="flex gap-3">
            <label className="input input-bordered input-primary flex items-center gap-2 flex-1">
              <MapPin className="w-5 h-5 text-base-content/50" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name..."
                className="grow"
              />
            </label>
            <button 
              onClick={handleSearch}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <MapPin className="text-primary" />
                {data.location.name}
              </h2>
              <p className="text-base-content/70 mt-1">
                {data.location.region}, {data.location.country}
              </p>
              <p className="text-sm text-base-content/50 mt-1">{data.location.localtime}</p>
            </div>
            <img 
              src={`https:${data.current.condition.icon}`} 
              alt={data.current.condition.text}
              className="w-24 h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="text-6xl font-bold text-primary mb-2">
                {data.current.temp_c}°C
              </div>
              <div className="text-xl text-base-content/80 mb-1">
                {data.current.condition.text}
              </div>
              <div className="text-base-content/60">
                Feels like {data.current.feelslike_c}°C
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  <span className="text-sm text-base-content/70">Temperature</span>
                </div>
                <div className="text-2xl font-bold">{data.current.temp_f}°F</div>
              </div>
              
              <div className="bg-secondary/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-base-content/70">Humidity</span>
                </div>
                <div className="text-2xl font-bold">{data.current.humidity}%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Wind className="w-8 h-8 text-primary" />
                <h3 className="card-title text-lg">Wind</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-base-content/70">Speed</span>
                  <span className="font-semibold">{data.current.wind_kph} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Direction</span>
                  <span className="font-semibold">{data.current.wind_dir} ({data.current.wind_degree}°)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-accent" />
                <h3 className="card-title text-lg">Visibility</h3>
              </div>
              <div className="text-3xl font-bold">{data.current.vis_km} km</div>
              <div className="text-sm text-base-content/60 mt-2">Clear visibility</div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="w-8 h-8 text-warning" />
                <h3 className="card-title text-lg">Pressure</h3>
              </div>
              <div className="text-3xl font-bold">{data.current.pressure_mb} mb</div>
              <div className="text-sm text-base-content/60 mt-2">Atmospheric pressure</div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <CloudRain className="w-8 h-8 text-info" />
                <h3 className="card-title text-lg">Precipitation</h3>
              </div>
              <div className="text-3xl font-bold">{data.current.precip_mm} mm</div>
              <div className="text-sm text-base-content/60 mt-2">Last hour</div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <CloudSun className="w-8 h-8 text-warning" />
                <h3 className="card-title text-lg">UV Index</h3>
              </div>
              <div className="text-3xl font-bold">{data.current.uv}</div>
              <div className="text-sm text-base-content/60 mt-2">
                {data.current.uv <= 2 ? 'Low' : data.current.uv <= 5 ? 'Moderate' : data.current.uv <= 7 ? 'High' : 'Very High'}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <CloudSun className="w-8 h-8 text-neutral" />
                <h3 className="card-title text-lg">Cloud Cover</h3>
              </div>
              <div className="text-3xl font-bold">{data.current.cloud}%</div>
              <div className="text-sm text-base-content/60 mt-2">Sky coverage</div>
            </div>
          </div>
        </div>

        {data.current.air_quality && aqiStatus && (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-4">Air Quality Index</h3>
              <div className={`badge ${aqiStatus.badge} badge-lg mb-6`}>
                {aqiStatus.text}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-base-200 rounded-lg p-4">
                  <div className="text-xs text-base-content/60 mb-1">CO</div>
                  <div className="text-lg font-bold">{data.current.air_quality.co.toFixed(1)}</div>
                </div>
                <div className="bg-base-200 rounded-lg p-4">
                  <div className="text-xs text-base-content/60 mb-1">NO₂</div>
                  <div className="text-lg font-bold">{data.current.air_quality.no2.toFixed(1)}</div>
                </div>
                <div className="bg-base-200 rounded-lg p-4">
                  <div className="text-xs text-base-content/60 mb-1">O₃</div>
                  <div className="text-lg font-bold">{data.current.air_quality.o3.toFixed(1)}</div>
                </div>
                <div className="bg-base-200 rounded-lg p-4">
                  <div className="text-xs text-base-content/60 mb-1">SO₂</div>
                  <div className="text-lg font-bold">{data.current.air_quality.so2.toFixed(1)}</div>
                </div>
                <div className="bg-base-200 rounded-lg p-4">
                  <div className="text-xs text-base-content/60 mb-1">PM2.5</div>
                  <div className="text-lg font-bold">{data.current.air_quality.pm2_5.toFixed(1)}</div>
                </div>
                <div className="bg-base-200 rounded-lg p-4">
                  <div className="text-xs text-base-content/60 mb-1">PM10</div>
                  <div className="text-lg font-bold">{data.current.air_quality.pm10.toFixed(1)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}