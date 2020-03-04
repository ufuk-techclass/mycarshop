import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Editcar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    year: "",
    price: ""
  });

  const handleClickOpen = () => {
    console.log("AAAA: ", props.car);
    setCar({
      brand: props.car.brand,
      model: props.car.model,
      color: props.car.color,
      fuel: props.car.fuel,
      year: props.car.year,
      price: props.car.price
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const updateCar = () => {
    props.updateCar(car, props.car._links.car.href);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Edit Car
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={e => handleInputChange(e)}
            label="Brand"
            fullWidth
          />
          <TextField
            margin="dense"
            name="model"
            value={car.model}
            onChange={e => handleInputChange(e)}
            label="Model"
            fullWidth
          />
          <TextField
            margin="dense"
            name="color"
            value={car.color}
            onChange={e => handleInputChange(e)}
            label="Color"
            fullWidth
          />
          <TextField
            margin="dense"
            name="year"
            value={car.year}
            onChange={e => handleInputChange(e)}
            label="Year"
            fullWidth
          />
          <TextField
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange={e => handleInputChange(e)}
            label="Fuel"
            fullWidth
          />
          <TextField
            margin="dense"
            name="price"
            value={car.price}
            onChange={e => handleInputChange(e)}
            label="Price"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateCar} color="primary">
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
