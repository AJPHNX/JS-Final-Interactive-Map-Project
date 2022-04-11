const fsKey='fsq3MbNrkxgPjUXYZohFDRG4bCQ4GTSYOUHggy/Fd267ieA='
const menuList = ['coffee','restaurant','hotel','market']

const testLat = 35.8781704
const testLong = -78.6565657

//let actLat = null//testLat
//let actLong = null//testLong
/*Coors Issues
`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`


let data = await response.text();
  let parsedData = JSON.parse(data);
*/

/************ 
 * +Get user location
 * ************/
/*
 async function getCoords(){
    return await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
        let pos = await 
    })
   // return [pos.coords.latitude, pos.coords.longitude]
}



 async function getUserLocation(){

    await navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude} = position.coords;
        // actLat = position.coords.latitude
        // actLong = position.coords.longitude
        
        // Show a map centered at latitude / longitude.
      });
    //return position.coords.latitude 
    }
*/
async function getUserLocation(){

    await navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude} = position.coords;
        // actLat = position.coords.latitude
        // actLong = position.coords.longitude
        
        // Show a map centered at latitude / longitude.
      });
    //return position.coords.latitude 
    }

 /************ 
 * +Fetch Business  Query
 * ************/
async function getQuery(busQuery){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3MbNrkxgPjUXYZohFDRG4bCQ4GTSYOUHggy/Fd267ieA='
        }
      };
      
    const response = fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?query=${busQuery}&ll=35.87%2C-78.65&radius=10&limit=10`, options)
    
    const data = await response
    let parseData = data
     /*let businesses = await parseData.results
        console.log(businesses.results)
    
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        // console.log(JSON.stringify(response))
    */
   console.log(parseData)
    }
/************ 
 * +Generate List to select from

 * ************/
function createMenu(){
    document.createElementbvId('ul')
    menuList.forEach(menuElement,()=>{
      let item = document.createElementBy('li')
      item.textContent = menuElement
    })
}

/************ 
 * +Create Map
* ************/ 
// function createMap(){
//if(actLat != null && actLong!= null){
    const myMap = L.map('map',{
        center: [testLat,testLong],
        zoom:12,
    })

// add openstreetmap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(myMap);

    // create and main add geolocation marker
    const marker = L.marker([testLat, testLong])
    marker.addTo(myMap).bindPopup('<p1><b>I am Here</b></p1>').openPopup()
//}
// }
function main(){
    // createMenu()
    //getUserLocation()
    console.log(getCoords())
    console.log(`Menu Selection: ${menuList[0]}`)
    // console.log (actLat)
    // console.log (actLong)
    // getQuery(`${menuList[0]}`)
    // createMap()
    

}
main()