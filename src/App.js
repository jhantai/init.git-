import React, {useState} from "react";
import './App.css';
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";


function App() {

  const API_KEY = '317147e078c54d6c882102156230710'
  const [city, SetCity] = useState('')
  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [gradus,setGradus] = useState("")
  const [ wind_kph,setWind_kph] = useState("")
  const [ wind_degree,setWind_degree] = useState("")
  const [errorText  , setErrorText]  = useState("")

  const defaultState = () => {
    setWeather(null)
    setIsActive (false)
    SetCity("")
    setGradus('')
    setWind_kph('')
    setWind_degree('')
    setErrorText ('')

  }

  const getWeather = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
      const data = await response.json()

      setIsLoading(false)
      setIsActive(true)
      setGradus("°C🌡")
      setWind_kph("Wind_kph")
      setWind_degree('wind_degree')
      setErrorText('')
      setWeather(data)
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
        const data = await response.json()
        setWeather(data)
      } catch (e) {
        if (response.status === 200) {
          test(data)
        } else if (response.status === 400) {
          defaultState()
          setErrorText('Такого города не существует   ')
        } else if (response.status === 403) {
          defaultState()
          setErrorText('Превышено количество запросов, просьба смените API KEY ')
        }
      }
    } catch (e) {
      defaultState()
      setErrorText('Сервер недоступен!')

    } }

  const resetWeather = async ()  => {
    defaultState()
  }

  return (
      <div className="App">
        <Header/>
        <Main
            SetCity={SetCity}
            getWeather={getWeather}
            weather={weather}
            isLoading={isLoading}
            isActive={isActive}
            resetWeather={resetWeather}
            gradus = {gradus}
            wind_kph = {wind_kph}
            wind_degree = {wind_degree}
            errorText = {errorText}
        />
        <Footer />
      </div>
  );
}

export default App;