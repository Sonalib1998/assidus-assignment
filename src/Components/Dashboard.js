import React, { useState ,useEffect} from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import AccountWatchlist from "./AccountWatchlist";

import Line from "./linechart";
import Barchart from "./barchart";
import Barchart2 from "./barchart2";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function createData(name, baseValue) {
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function roundToDecimal(number, decimalPlaces) {
    const factor = 10 ** decimalPlaces;
    return Math.round(number * factor) / factor;
  }

  return {
    name,
    thismonth: roundToDecimal(
      getRandomNumber(baseValue - 50, baseValue + 50),
      2
    ),
    ytd: roundToDecimal(getRandomNumber(baseValue * 0.5, baseValue * 1.5), 1),
  };
}

function Dashboard() {
  const gridStyle = {
    margin: " 5px 5px 10px 200px",
  };
  
  const [data, setData] = useState([
    { name: "09", value: 30 },
    { name: "10", value: 10 },
    { name: "11", value: 50 },
    { name: "12", value: 20 },
    { name: "13", value: 80 },
    { name: "14", value: 30 },
    { name: "15", value: 0 },
    { name: "16", value: 20 },
    { name: "17", value: 100 },
    { name: "18", value: 55 },
  ]);
  const [bardata, setBarData] = useState([
    { name: "Sun", cashIn: 100, cashOut: 50 },
    { name: "Mon", cashIn: 50, cashOut: 30 },
    { name: "Tue", cashIn: 500, cashOut: 200 },
    { name: "Wed", cashIn: 300, cashOut: 150 },
    { name: "Thu", cashIn: 200, cashOut: 100 },
    { name: "Fri", cashIn: 20, cashOut: 10 },
  ]);
  const [bar, setBar] = useState([
    { name: "Sun", value: 100 },
    { name: "Mon", value: 50 },
    { name: "Tue", value: 500 },
    { name: "Wed", value: 300 },
    { name: "Thu", value: 200 },
    { name: "Fri", value: 20 },
  ]);
  const [rows, setRows] = useState([
    createData("Sales", 159),
    createData("Advertising", 237),
    createData("Inventory", 262),
    createData("Entertainment", 305),
    createData("Product", 356),
  ]);
  const randomData = () => {
    
    const account = dataa.map((d) => ({
      name: d.date,
      value: d.value.delta7.confirmed,
    }));
    console.log(account)
    setData(account);
    const invoice = bar.map((obj) => ({
      name: obj.name,
      value: Math.floor(Math.random() * 500 + 1),
    }));
    setBar(invoice);
    const cashInOut = bardata.map((item) => ({
      ...item,
      cashIn: Math.random() * 100,
      cashOut: Math.random() * 50,
    }));
    setBarData(cashInOut);
    const tableData = rows.map((row) => createData(row.name, row.thismonth));
    setRows(tableData);
  };

  const handleChange3 = (event) => {
    randomData();
  };



  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpen = () => {
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    randomData();
  };
  const [selectedDate2, setSelectedDate2] = useState(null);

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    randomData();
  };

  const [dataa, setDataa] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://data.covid19india.org/v4/min/timeseries.min.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        const mapFromObject = new Map(Object.entries(result.BR.dates));
  
      const filteredMap = new Map(
        Array.from(mapFromObject.keys())
          .filter(key => new Date(key).toLocaleDateString() >= new Date(selectedDate).toLocaleDateString() && new Date(key).toLocaleDateString() <= new Date(selectedDate2).toLocaleDateString())
          .map(key => [key, mapFromObject.get(key)])
      );
      const dataArray = Array.from(filteredMap.entries()).map(([key, value]) => ({ date: key, value }));

      setDataa(dataArray);
      console.log(dataArray,filteredMap)
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchData();
  }, [selectedDate2, selectedDate]);
  
  return (
    <div className="card-container" style={gridStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={handleChange3}
          >
            Randomise Data
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Card
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                padding: "5px",
              }}
            >
              <h3>Checking account</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
                <DatePicker
                  selected={selectedDate2}
                  onChange={handleDateChange2}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />

              </div>
            </div>
            <CardContent style={{ flexGrow: 1 }}>
              <Line linedata={{ data }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <h3 style={{ margin: 0 }}>Invoices owed to you</h3>
              <Button
                style={{ borderColor: "#14C503", color: "#14C503" }}
                variant="outlined"
                size="small"
                onClick={handleOpen}
              >
                New Sales Invoice
              </Button>
            </div>
            <CardContent style={{ flexGrow: 1 }}>
              <Barchart bar={{ bar }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                padding: "5px",
              }}
            >
              <h3>Total Cash flow</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#14C503",
                      width: "15px",
                      height: "15px",
                      margin: "5px",
                    }}
                  ></div>
                  <span>Cash In</span>
                </div>
                {/* Second Legend */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "lightgreen",
                      width: "15px",
                      height: "15px",
                      margin: "5px",
                    }}
                  ></div>
                  <span>Cash Out</span>
                </div>
              </div>
            </div>
            <CardContent style={{ flexGrow: 1 }}>
              <Barchart2 bardata={{ bardata }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card style={{ height: "100%", padding: "5px" }}>
            <h3>Account Watchlist</h3>
            <CardContent>
              <AccountWatchlist rows={rows} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Modal
        open={isPopupOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;
