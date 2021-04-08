const express = require('express');
const cors = require('cors');
const {addElevator, getElevator, setOTP, sendToFloor} = require('./elevator');
const {sign, authenticateJWT} = require("./token");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

/* PUT /elevator
 * {floors: Array<number>}
 */

app.post("/elevator", (req, res) => {
    if(req && req.body && req.body.floors && req.body.endpoint){
        const id = addElevator(req.body.floors, req.body.endpoint);
        setOTP(id).catch(e => console.log("El código no se ha enviado al ascensor."));
        res.status(200).send({id});
    } else {
        res.status(400).send({});
    }
});

// Obtener el otp del ascensor con id :id.
app.get("/otp/:id", (req, res) => {
    const elevator = getElevator(parseInt(req.params.id));
    if(elevator){
        const {otp} = elevator;
        res.status(200).send({otp});
    } else res.status(404).send({});

});

app.get("/elevator/:id", (req, res) => {
    const elevator = getElevator(parseInt(req.params.id));
    if(elevator){
        const {floors} = elevator;
        res.status(200).send({floors});
    } else res.status(404).send({});

})

// Obtener acceso al ascensor
app.post("/elevator/:id/access", (req, res) => {
    if(req === undefined || req.body === undefined || req.body.otp === undefined) {
        res.status(400).send({});
    }

    const id = parseInt(req.params.id);
    const elevator = getElevator(id);

    if(elevator === undefined) res.status(404).send({});

    if(elevator.otp === req.body.otp) {
        res.status(200).send({token: sign({id})});
    } else {
        res.status(403).send({});
    }
})

app.post("/elevator/move/", authenticateJWT,(req, res) => {
   
    if (req === undefined || req.body === undefined ||
         req.body.floor === undefined) {
            res.status(400).send({});
            return;
    }

    const id = parseInt(req.id);
    const floor = parseInt(req.body.floor);
    const elevator = getElevator(id);

    if(elevator === undefined) {
        res.status(404).send({});
        return;
    }

    const {floors} = elevator;
    if(!floors.includes(floor))  {
        res.status(403).send({}); return;
    }

    setOTP(id).catch(e => console.log("El código no se ha enviado al ascensor."));
    sendToFloor(id, floor).then(() => {
        res.status(201).send({});
    }).catch(e => {
        res.status(418).send({});
    });
    
});


app.listen(port, "0.0.0.0", () => {
    console.log("NINIO EL EREVERDISO ESTA ESCOITANODO")
});

