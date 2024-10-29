import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import SwitchButton from './Button';

const App = () => {
  const [isMains, setIsMains] = useState(false);
  const [isInverter, setIsInverter] = useState(false);
  const [isBatteryCharge, setIsBatteryCharge] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');


  

  const [formData, setFormData] = useState({
    SerialNumber:'',
    BatteryVoltage:'',
    BatteryCapacity:'',
    IpVoltage1:'',
    IpVoltage2: '',
    IpVoltage3: '',
    OpVoltage1: '',
    OpVoltage2: '',
    OpVoltage3: '',
    IpFrequency: '',
    OpFrequency: '',
    Temperature: '',
    InverterStatus:'0',
    Mains: '0', // Consider adjusting this based on isInverter state.
    BatteryCharge: '0', // Consider adjusting this based on isBatteryCharge state.
    HighDC: '0',
    OverLoad: '0',
    OverTemperature:'0',
    ShortCircuit:'0',
    EmergencyStop:'0',
    Okay:'0',
    BatteryShutDown:'0',
    BatteryLow:'0',
    BatteryOkay:'0',
    Load1:'',
    Load2:'',
    Load3:'',
    Company:'',
    Model:'',
    version:'',
    RectifierNeutral:'',
    RectifierPhase:'',
    Topology:'',
    RectifierFrequency:'',
    BypassNeutral:'',
    BypassPhase:'',
    BypassTopology:'',
    BypassFrequency:'',
    OutputNeutral:'',
    OutputPhase:'',
    OutputTopology:'',
    OutputFrequency:'',
    UpsBatteryVoltage:'',
    PowerRating:''


  });

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      HighDC: selectedValue === 'HighDC' ? '1' : '0',
      OverLoad: selectedValue === 'OverLoad' ? '1' : '0',
      OverTemperature: selectedValue === 'OverTemperature' ? '1' : '0',
      ShortCircuit: selectedValue === 'ShortCircuit' ? '1' : '0',
      EmergencyStop: selectedValue === 'EmergencyStop' ? '1' : '0',
      Okay:selectedValue==="Okay" ? '1':'0'
    });
  };

  const handleOptionChange1 = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedOption1(event.target.value);
    setFormData({
      ...formData,
      BatteryShutDown: selectedValue === 'BatteryShutDown' ? '1' : '0',
      BatteryLow: selectedValue === 'BatteryLow' ? '1' : '0',
  
    });
  };

  useEffect(()=>{
    fetch('http://localhost:8000/unilineSimulator/getData',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',

      },
      body:JSON.stringify({SerialNumber:formData.SerialNumber})
    })
    .then((res)=>{
       return res.json();
     })
     .then((json)=>{
      setFormData({
        ...formData,
        BatteryVoltage:json.BatteryVoltage,
        BatteryCapacity:json.BatteryCapacity,
        IpVoltage1: json.IpVoltage1,
        IpVoltage2: json.IpVoltage2,
        IpVoltage3: json.IpVoltage3,
        OpVoltage1: json.OpVoltage1,
        OpVoltage2: json.OpVoltage2,
        OpVoltage3: json.OpVoltage3,
        IpFrequency: json.IpFrequency,
        OpFrequency:json.OpFrequency,
        Temperature: json.Temperature,
        InverterStatus: json.InverterStatus=='1',
        BatteryCharge: json.BatteryCharge=='1',
        HighDC: json.HighDC,
        OverLoad: json.OverLoad,
        OverTemperature:json.OverTemperature,
        ShortCircuit:json.ShortCircuit,
        EmergencyStop:json.EmergencyStop,
        Okay:json.Okay,
        BatteryLow:json.BatteryLow,
        BatteryShutDown:json.BatteryShutDown,
        Load1:json.Load1,
        Load2:json.Load2,
        Load3:json.Load3,
        Company:json.Company,
        Model:json.Model,
        version:json.version,
        RectifierNeutral:json.RectifierNeutral,
        RectifierPhase:json.RectifierPhase,
        Topology:json.Topology,
        RectifierFrequency:json.RectifierFrequency,
        BypassNeutral:json.BypassNeutral,
        BypassPhase:json.BypassPhase,
        BypassTopology:json.BypassTopology,
        BypassFrequency:json.BypassFrequency,
        OutputNeutral:json.OutputNeutral,
        OutputPhase:json.OutputPhase,
        OutputTopology:json.OutputTopology,
        OutputFrequency:json.OutputFrequency,
        UpsBatteryVoltage:json.UpsBatteryVoltage,
        PowerRating:json.PowerRating

      });

     
    
     })
  },[formData.SerialNumber])

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange1 = (name, checked) => {
    console.log(name,checked);
    setFormData({ ...formData, [name]: checked ? '1' : '0' });
  };
  const handleSwitchChange2 = (name, checked) => {
    console.log(name,checked);
    setFormData({ ...formData, [name]: checked ? '1' : '0' });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch('http://localhost:8000/unilineSimulator/submitData',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',

      },
      body:JSON.stringify(formData)
    })
    .then((res)=>{
      console.log(res.status);
       
      if(res.status==200)
        {
         alert("Saved Sucessfully");
        }
        else{
         alert("Error : 505");
        }
       
    })
   
    
    // Handle submission logic
  };

  return (
    <Box sx={{ mt: 5, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Uniline Device Data
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              label="SerialNumber"
              fullWidth
              name="SerialNumber"
              value={formData.SerialNumber}
              onChange={handleInputChange}
              error={!!errors.SerialNumber}
              helperText={errors.SerialNumber}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Battery Voltage"
              fullWidth
              name="BatteryVoltage"
              value={formData.BatteryVoltage}
              onChange={handleInputChange}
              error={!!errors.BatteryVoltage}
              helperText={errors.BatteryVoltage}
          
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Battery Capacity"
              fullWidth
              name="BatteryCapacity"
              value={formData.BatteryCapacity}
              onChange={handleInputChange}
              error={!!errors.BatteryCapacity}
              helperText={errors.BatteryCapacity}
          
            />
          </Grid>
        
          <Grid item xs={12}>
            <TextField
              label="Input Frequency"
              fullWidth
              name="IpFrequency"
              value={formData.IpFrequency}
              onChange={handleInputChange}
              error={!!errors.IpFrequency}
              helperText={errors.IpFrequency}
          
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Output Frequency"
              fullWidth
              name="OpFrequency"
              value={formData.OpFrequency}
              onChange={handleInputChange}
              error={!!errors.OpFrequency}
              helperText={errors.OpFrequency}
          
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Input Voltage 1"
              fullWidth
              name="IpVoltage1"
              value={formData.IpVoltage1}
              onChange={handleInputChange}
              error={!!errors.IpVoltage1}
              helperText={errors.IpVoltage1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Input Voltage 2"
              fullWidth
              name="IpVoltage2"
              value={formData.IpVoltage2}
              onChange={handleInputChange}
              error={!!errors.IpVoltage2}
              helperText={errors.IpVoltage2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Input Voltage 3"
              fullWidth
              name="IpVoltage3"
              value={formData.IpVoltage3}
              onChange={handleInputChange}
              error={!!errors.IpVoltage3}
              helperText={errors.IpVoltage3}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Output Voltage 1"
              fullWidth
              name="OpVoltage1"
              value={formData.OpVoltage1}
              onChange={handleInputChange}
              error={!!errors.OpVoltage1}
              helperText={errors.OpVoltage1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Output Voltage 2"
              fullWidth
              name="OpVoltage2"
              value={formData.OpVoltage2}
              onChange={handleInputChange}
              error={!!errors.OpVoltage2}
              helperText={errors.OpVoltage2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Output Voltage 3"
              fullWidth
              name="OpVoltage3"
              value={formData.OpVoltage3}
              onChange={handleInputChange}
              error={!!errors.OpVoltage3}
              helperText={errors.OpVoltage3}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Load1"
              fullWidth
              name="Load1"
              value={formData.Load1}
              onChange={handleInputChange}
              error={!!errors.Load1}
              helperText={errors.Load1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Load2"
              fullWidth
              name="Load2"
              value={formData.Load2}
              onChange={handleInputChange}
              error={!!errors.Load2}
              helperText={errors.Load2}
            />
          </Grid>
        
          <Grid item xs={12}>
            <TextField
              label="Load3"
              fullWidth
              name="Load3"
              value={formData.Load3}
              onChange={handleInputChange}
              error={!!errors.Load3}
              helperText={errors.Load3}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Temperature"
              fullWidth
              name="Temperature"
              value={formData.Temperature}
              onChange={handleInputChange}
              error={!!errors.Temperature}
              helperText={errors.Temperature}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Company"
              fullWidth
              name="Company"
              value={formData.Company}
              onChange={handleInputChange}
              error={!!errors.Company}
              helperText={errors.Company}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Model"
              fullWidth
              name="Model"
              value={formData.Model}
              onChange={handleInputChange}
              error={!!errors.Model}
              helperText={errors.Model}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Version"
              fullWidth
              name="version"
              value={formData.version}
              onChange={handleInputChange}
              error={!!errors.version}
              helperText={errors.version}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="RectifierNeutral"
              fullWidth
              name="RectifierNeutral"
              value={formData.RectifierNeutral}
              onChange={handleInputChange}
              error={!!errors.RectifierNeutral}
              helperText={errors.RectifierNeutral}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="RectifierPhase"
              fullWidth
              name="RectifierPhase"
              value={formData.RectifierPhase}
              onChange={handleInputChange}
              error={!!errors.RectifierPhase}
              helperText={errors.RectifierPhase}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Topology"
              fullWidth
              name="Topology"
              value={formData.Topology}
              onChange={handleInputChange}
              error={!!errors.Topology}
              helperText={errors.Topology}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="RectifierFrequency"
              fullWidth
              name="RectifierFrequency"
              value={formData.RectifierFrequency}
              onChange={handleInputChange}
              error={!!errors.RectifierFrequency}
              helperText={errors.RectifierFrequency}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="BypassNeutral"
              fullWidth
              name="BypassNeutral"
              value={formData.BypassNeutral}
              onChange={handleInputChange}
              error={!!errors.BypassNeutral}
              helperText={errors.BypassNeutral}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="BypassPhase"
              fullWidth
              name="BypassPhase"
              value={formData.BypassPhase}
              onChange={handleInputChange}
              error={!!errors.BypassPhase}
              helperText={errors.BypassPhase}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="BypassTopology"
              fullWidth
              name="BypassTopology"
              value={formData.BypassTopology}
              onChange={handleInputChange}
              error={!!errors.BypassTopology}
              helperText={errors.BypassTopology}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="BypassFrequency"
              fullWidth
              name="BypassFrequency"
              value={formData.BypassFrequency}
              onChange={handleInputChange}
              error={!!errors.BypassFrequency}
              helperText={errors.BypassFrequency}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="OutputNeutral"
              fullWidth
              name="OutputNeutral"
              value={formData.OutputNeutral}
              onChange={handleInputChange}
              error={!!errors.OutputNeutral}
              helperText={errors.OutputNeutral}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="OutputPhase"
              fullWidth
              name="OutputPhase"
              value={formData.OutputPhase}
              onChange={handleInputChange}
              error={!!errors.OutputPhase}
              helperText={errors.OutputPhase}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="OutputTopology"
              fullWidth
              name="OutputTopology"
              value={formData.OutputTopology}
              onChange={handleInputChange}
              error={!!errors.OutputTopology}
              helperText={errors.OutputTopology}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="OutputFrequency"
              fullWidth
              name="OutputFrequency"
              value={formData.OutputFrequency}
              onChange={handleInputChange}
              error={!!errors.OutputFrequency}
              helperText={errors.OutputFrequency}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="UpsBatteryVoltage"
              fullWidth
              name="UpsBatteryVoltage"
              value={formData.UpsBatteryVoltage}
              onChange={handleInputChange}
              error={!!errors.UpsBatteryVoltage}
              helperText={errors.UpsBatteryVoltage}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="PowerRating"
              fullWidth
              name="PowerRating"
              value={formData.PowerRating}
              onChange={handleInputChange}
              error={!!errors.PowerRating}
              helperText={errors.PowerRating}
            />
          </Grid>
          
         
          <div>
          <label>
        <input
          type="radio"
          name="BatteryLow"
          value="BatteryLow"
          checked={selectedOption1 === 'BatteryLow'}
          onChange={handleOptionChange1}
        />
         Battery Low
      </label>
      <label>
        <input
          type="radio"
          name="BatteryShutDown"
          value="BatteryShutDown"
          checked={selectedOption1 === 'BatteryShutDown'}
          onChange={handleOptionChange1}
        />
         Battery Shut Down
      </label>
      <label>
        <input
          type="radio"
          name="BatteryOkay"
          value="BatteryOkay"
          checked={selectedOption1 === 'BatteryOkay'}
          onChange={handleOptionChange1}
        />
        Battery Okay
      </label>
      </div>
          <Grid item xs={12}>
            <SwitchButton
              name="Mains"
              value={formData.Mains}
              onChange={(e) => handleSwitchChange2('Mains', e.target.checked)}
              label="Mains"
              OnLabel="ON"
              Offlable="OFF"
              isChecked={isMains}
              setIsChecked={setIsMains}
            />
          </Grid>
          <Grid item xs={12}>
            <SwitchButton
              name="Inverter"
              value={formData.InverterStatus}
              onChange={(e) => handleSwitchChange2('InverterStatus', e.target.checked)}
              label="Inverter"
              OnLabel="ON"
              Offlable="OFF"
              isChecked={isInverter}
              setIsChecked={setIsInverter}
            />
          </Grid>
          <Grid item xs={12}>
            <SwitchButton
              name="BatteryCharge"
              value={formData.BatteryCharge}
              onChange={(e) => handleSwitchChange1('BatteryCharge', e.target.checked)}
              label="Battery Charge"
              OnLabel="BOOST"
              Offlable="FLOAT"
              isChecked={isBatteryCharge}
              setIsChecked={setIsBatteryCharge}
            />
          </Grid>
          <div>
      <label>
        <input
          type="radio"
          name="HighDC"
          value="HighDC"
          checked={selectedOption === 'HighDC'}
          onChange={handleOptionChange}
        />
         Hign DC
      </label>
      <label>
        <input
          type="radio"
          name="OverLoad"
          value="OverLoad"
          checked={selectedOption === 'OverLoad'}
          onChange={handleOptionChange}
        />
         Over Load
      </label>
      <label>
        <input
          type="radio"
          name="OverTemperature"
          value="OverTemperature"
          checked={selectedOption === 'OverTemperature'}
          onChange={handleOptionChange}
        />
         Over Temperature
      </label>
      <label>
        <input
          type="radio"
          name="ShortCircuit"
          value="ShortCircuit"
          checked={selectedOption === 'ShortCircuit'}
          onChange={handleOptionChange}
        />
         Short Circuit
      </label>
      <label>
        <input
          type="radio"
          name="EmergencyStop"
          value="EmergencyStop"
          checked={selectedOption === 'EmergencyStop'}
          onChange={handleOptionChange}
        />
        Emergency Stop
      </label>
      <label>
        <input
          type="radio"
          name="Okay"
          value="Okay"
          checked={selectedOption === 'Okay'}
          onChange={handleOptionChange}
        />
        Okay
      </label>
      
     
    </div>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default App;
