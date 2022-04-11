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
            
            let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${busQuery}&ll=35.88%2C-78.66&radius=10&limit=5`, options)//original
            //const respObj = await JSON.parse(response)
            /* let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${busQuery}&ll=${lat}%2C-${long}&radius=10&limit=${searchLimit}`, options)//modified */

            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        /****Original ${corsFix}*/
         /*******Old Fetch   
        const options = {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            Authorization: 'fsq3MbNrkxgPjUXYZohFDRG4bCQ4GTSYOUHggy/Fd267ieA='
            }
        }; 
        const response = await fetch(`https://api.foursquare.com/v3/places/search?query=${busQuery}&ll=${lat}%2C-${long}&radius=10&limit=${searchLimit}`, options)
         *******/
        /*****************************
        const data = await response.json()
        const parseData = JSON.stringify(data)
        let businesses = await parseData.results
            console.log(businesses.results)
         ******************************/
        /********Who knows
        .then(response => response.json())
        .then(response => JSON.stringify(response))
        .then(response => response.results)
        .then(response => console.log(response))
        .catch(err => console.error(err));
        **********/
         
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