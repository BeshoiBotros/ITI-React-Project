import { MapPin, CloudSun, Wind, Droplets, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Weather } from "../../types";
import { useForm } from 'react-hook-form';
import { fetchWeather } from "../../aoi";
import LoadingCard from "../loadingCard";
import { useState } from "react";

interface WeatherForm {
    city: string;
}

export default function WeatherWidget() {
    const [searchCity, setSearchCity] = useState('cairo'); // State for the city to search

    const { register, handleSubmit, reset } = useForm<WeatherForm>({
        defaultValues: { city: 'cairo' }
    });

    const { data, isLoading, error, refetch } = useQuery<Weather>({
        queryKey: ['weather', searchCity], // Use searchCity instead of cityValue
        queryFn: () => fetchWeather(searchCity),
        retry: 2,
        staleTime: 5 * 60 * 1000,
    });
    
    const onSubmit = (data: WeatherForm) => {
        setSearchCity(data.city); // Update search city only on submit
    }

    const handleTryAgain = () => {
        reset({ city: 'cairo' });
        setSearchCity('cairo'); // Reset to default city
    }

    if(isLoading){
        return <LoadingCard />
    }

    // Handle error state
    if(error) {
        return (
            <div className="card min-w-[200px] w-full bg-base-200 shadow-md rounded-2xl border border-gray-200 p-10 my-5 w-80">
                <div className="flex flex-col items-center justify-center text-center gap-4">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                    <div>
                        <h3 className="text-lg font-semibold text-red-600 mb-2">
                            Unable to fetch weather
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {error instanceof Error ? error.message : 'Something went wrong'}
                        </p>
                        <button 
                            onClick={handleTryAgain}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

  return (
    <div className="card min-w-[200px] w-full bg-base-200 shadow-md hover:shadow-xl transition duration-300 rounded-2xl border border-gray-200 p-10 my-5 w-80 font-sans">
      <h2 className="text-xl font-semibold mb-4">Weather Widget</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 mb-6"
      >
        <label className="input w-full">
          <MapPin className="text-gray-400" />
          <input
            {...register('city')}
            type="text"
            className="grow w-full"
            placeholder="Cairo"
          />
        </label>
        <button 
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Search
        </button>
      </form>

      <div className="flex items-start gap-4 mb-6">
        <CloudSun className="w-12 h-12 text-gray-700" />
        <div>
          <div className="text-5xl font-semibold"> {data?.current.temp_c}° </div>
          <div className="text-gray-500 text-sm">({data?.current.condition.text})</div>
        </div>
      </div>

      <div className="flex gap-8 mb-6">
        <div>
          <div className="text-xs text-gray-500 mb-1">Humidity</div>
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium"> {data?.current.humidity}% </span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Wind</div>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium"> {data?.current.wind_kph} km/h</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-medium transition-colors">
        View Full Forecast
      </button>
    </div>
  );
}