const fsKey='fsq3MbNrkxgPjUXYZohFDRG4bCQ4GTSYOUHggy/Fd267ieA='
const menuList = ['default','coffee','restaurant','hotel','market']
let menuChoice = menuList[2]
const testLat = 35.8781704
const testLong = -78.6565657
const searchLimit = 5
let coords = []
const dropDown = document.getElementById('business')
dropDown.addEventListener("change",(e)=>{
    menuChoice = e.target.value
    console.log(menuChoice)
    /************ 
    * +Fetch Business Query
    * ************/
    async function getQuery(busQuery){
        let lat = coords[0]
            lat = lat.toFixed(2)
        let long = coords[1]
            long = long.toFixed(2)
        let corsFix = 'https://cors-anywhere.herokuapp.com/'
            console.log(`pre fetch: ${lat} , ${long}`)
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'fsq3MbNrkxgPjUXYZohFDRG4bCQ4GTSYOUHggy/Fd267ieA='
            }
            };
            
        const response = await fetch(`${corsFix}https://api.foursquare.com/v3/places/search?query=${busQuery}&ll=35.88%2C-78.66&limit=5`, options)

        const data = await response.text();
        let parseData = JSON.parse(data);
        let businesses = parseData.results;
        businesses.forEach((business)=>{
            console.log(`${business.name}:
            ${business.geocodes.main.latitude},
            ${business.geocodes.main.longitude}`)
            let pin = L.marker(coords)
            pin.addTo(myMap).bindPopup(`<p1><b>${business.name}</b></p1>`).openPopup()
        });
            

        }
    getQuery(menuChoice)
    
 })
 const generateMap = async () =>{
    coords = await navigator.geolocation.getCurrentPosition(position => {
    const {latitude, longitude} = position.coords;
    coords = [position.coords.latitude,position.coords.longitude]
    console.log(coords)

    /************ 
     * +Create Map
    *************/ 
    // function createMap(){
        const myMap = L.map('map',{
            center: coords,
            zoom:12,
        })
    //***** add openstreetmap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '15',
        }).addTo(myMap);
    //*****  create and main add geolocation marker
        const marker = L.marker(coords)
        marker.addTo(myMap).bindPopup('<p1><b>I am Here</b></p1>').openPopup()
    //}
    
        //getQuery(menuChoice)
        console.log(`Menu Selection: ${menuChoice}`)
      });
      console.log(coords) 
    } 
async function main(){
    // createMenu()

    coords = generateMap()
    console.log(`Initial Menu Selection: null`)
 
    // getQuery(`${menuList[0]}`)
    // createMap()
    
    console.log(coords)
}
//console.log(getUserLocation)
main()