function createRandomLuggage(simulationTarget, numberOfBays){
  currentBayId = getRandomInt(1, numberOfBays);
  for (var sumLuggage = 1; sumLuggage <= simulationTarget; sumLuggage++) {
    luggage
        .document('L' + sumLuggage + currentBayId + flight)
        .mutate({
          id: sumLuggage,
          status: 'Waiting for Loading',
          bay: currentBayId,
          origin: 'SFO',
          flight: 'RANDOM FLIGHT'
        })
        .then(
          () => console.log('success'),
          err => {
            if (err) {
              switch (err.type) {
                case 'timeout':
                case 'permission-denied':
                    console.log(err.type)
                    break
              }
            }
          }
        )
  }
}

function createLuggage(gateNumber, departureTime, numberOfBags){
  currentBayId = 1;
  for (var sumLuggage = 1; sumLuggage <= numberOfBags; sumLuggage++) {
    luggage
        .document('L' + sumLuggage + gateNumber + departureTime)
        .mutate({
          id: sumLuggage,
          status: 'Waiting for Loading',
          bay: getRandomInt(1, 3),
          origin: 'SFO',
          departure: departureTime
        })
        .then(
          () => console.log('success'),
          err => {
            if (err) {
              switch (err.type) {
                case 'timeout':
                case 'permission-denied':
                    console.log(err.type)
                    break
              }
            }
          }
        )
  }
}

function deleteAll() {
  for (sumLuggage = 1; sumLuggage <= simulationTarget; sumLuggage++) {
    for (var j = 1; j < 4; j++) {
      luggage
        .document('L' + sumLuggage + j + '0000')
        .delete({ timeout: 10000 })
        .then(
          () => console.log('success'),
          err => console.log(err.type)
        )
    }
  }
}

function delete(id) {
  luggage
    .document(id)
    .delete({ timeout: 10000 })
    .then(
      () => console.log('success'),
      err => console.log(err.type)
    )
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
