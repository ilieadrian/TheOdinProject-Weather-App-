const cityInput = document.getElementById("city-name");
const submitBTN = document.getElementById("button");
const inputErrorMessage = document.getElementById("error-mesage")

function fetchData(city) {
  return new Promise((resolve, reject) => {
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=K2LFQUZTBEFMY6X55NN7KWSTF`, { mode: 'cors' })
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then((data) => {
              resolve(data);  // Resolve the promise with the data
          })
          .catch((error) => {
              reject(`Error: Data fetch failed - ${error.message}`);  // Reject the promise with an error message
          });
  });
}

async function getData(param) {
  let dataIsProcessing = true;
  handleDataProcessing(dataIsProcessing)
  try {
    const data = await fetchData(param);
    dataIsProcessing = false;
    processData(data)
    handleDataProcessing(dataIsProcessing)
  } catch (error) {
    console.error("Error:", error)
  } 
}

function processData(data) {
  console.log("Procesdata fired", data)
  const currentTempF = data.currentConditions.temp;
  const currentTempC =  ((currentTempF - 32) * 5/9).toFixed(1);
  const curentCondition = data.currentConditions.conditions;
  const curentConditionDescription = data.description;
  const iconCode = data.currentConditions.icon;

  console.log(currentTempF, currentTempC, curentCondition, curentConditionDescription, iconCode)
}

function handleDataProcessing(dataIsProcessing) {
  if(dataIsProcessing) {
    console.log("data Is Processing")
  } else {
    console.log("finished data proceesing")
  }
  
}

function validateInput() {
  const cityName = cityInput.value.trim()

  if(cityName.length === 0) {
    inputErrorMessage.style.setProperty("display", "block")
    cityInput.style.setProperty("border", "1px solid red")
    return;
  } else {
    inputErrorMessage.style.setProperty("display", "none")
    cityInput.style.removeProperty("border", "1px solid red")
  }
}


submitBTN.addEventListener('click', validateInput)

// getData("Bucuresti")

