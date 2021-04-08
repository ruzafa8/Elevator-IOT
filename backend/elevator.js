const otpGenerator = require('otp-generator');
const {fetch} = require("./backend/fetch");
const OTP_LENGHT = 4;
const options = {
    digits:true, 
    alphabets: false, 
    upperCase: false, 
    specialChars: false
};

const generate = () => otpGenerator.generate(OTP_LENGHT, options);

const elevators = new Map();
let id = 0;

const addElevator = (floors, endpoint="192.168.0.20:80") => {
    id = id + 1;
    elevators.set(id, {floors, otp: generate(), endpoint});
    return id;
}

const getElevator = id => elevators.get(id)

const setOTP = id => {
    const elevator = getElevator(id);

    if(elevator == undefined) return Promise.reject({msg: "NOTFOUND"});

    const otp = generate();
    elevators.set(id, {...elevator, otp});
    return sendCode(elevator.endpoint,otp);
}

const sendToFloor = (id, floor) => {
    const elevator = getElevator(id);
    if(elevator === undefined) return Promise.reject({msg: "NOTFOUND"});
    console.log(`Ascensor ${id} va a la planta ${floor}`)
    return toFloor(elevator.endpoint, floor);
}

module.exports = {
    addElevator, getElevator, setOTP, sendToFloor
}

const sendCode = (elevatorEndpoint, otp) => fetch(
    elevatorEndpoint,"Pantalla", "POST", `[${otp}]`
);


const toFloor = (elevatorEndpoint, floor) => fetch(
    elevatorEndpoint,"Motor", "POST", `[${floor}]`
);
