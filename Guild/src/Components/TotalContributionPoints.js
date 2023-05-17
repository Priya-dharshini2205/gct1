import React,{useEffect,useState} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Select from 'react-select'




function TotalContributionPoints(){
    const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);



  
    useEffect(() => {
        fetch("http://localhost:4000/userData", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userData");
            if (data.data.userType === "Admin") {
              setAdmin(true);
            }
    
            setUserData(data.data);
    
            if (data.data === "token expired") {
              alert("Token expired login again");
              window.localStorage.clear();
              window.location.href = "./sign-in";
            }
          });
      }, []);
    
      const [data, setData] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:4000/getAllData", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "getAllData");
            setData(data.data);
          });
      }, []);
     

      const d1 = new Date();
      let curr_year = d1.getFullYear();


      const options1 = [
        { value: curr_year, label: curr_year },
        { value: curr_year-1, label: curr_year-1 },
        { value: curr_year-2, label: curr_year-2},
        { value: curr_year-3, label: curr_year-3},
        { value: curr_year-4, label: curr_year-4 }
      ]
      const options2 = [
        { value:"Q1", label: "Q1"},
        { value: "Q2", label:"Q2"},
        { value:"Q3", label: "Q3"},
        { value: "Q4", label: "Q4"}
      ]
      const [year, setYear] = useState(options1[0].value);
      const [quater, setQuater] = useState(options2[0].value);
      const [total, setTotal] = useState(0);
     
     const handleClick = ()=>{
      console.log(quater+" "+year);
      fetch("http://localhost:4000/quaterDetails", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
           year,quater,email:userData.email
          }),
        }).then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTotal(data.data);
          });
     }
    return (
        <div className='login-bg' style={{backgroundColor:"black"}}>
           <Navbar />
           
           <br />
           <Select options={options1} defaultValue={options1[0]} onChange={(e)=>{setYear(e.value)}}/>
           <Select options={options2} defaultValue={options2[0]} onChange={(e)=>{setQuater(e.value)}}/>
           
           <button onClick={handleClick}>Find Points</button>
           <Card style={{ width: '18rem' }}>  {total}</Card>
         
           <div className="main-card">
    <div className="card-1">
    <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>Your cuurent
           Quarter Points </Card.Title>
        <Card.Text>
       
        q1: {userData.q1}<br></br>
        q2: {userData.q2}<br></br>
        q3: {userData.q3}<br></br>
        q4: {userData.q4}
        </Card.Text>
    
      
      </Card.Body>
    </Card>

    </div>
    <div className="card-1">
    <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>Your Yearly Points </Card.Title>
        <Card.Text>
        curr: {userData.curr_yr_points}<br></br>
        prev: {userData.prev_yr_points}
        </Card.Text>
    
      
      </Card.Body>
    </Card>
    
    </div>
    </div>
   
    <h1 style={{textAlign:'center',marginTop:'50px', color:"white"}}>Points Summary:  {userData.points} </h1>
         <div className="container" >
         <Table striped>
      <thead style={{color:"white"}}>
        <tr style={{textAlign:"center"}}>
         
          <th>Contribution Type</th>
          <th>Points Credited</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      {data.map((i) => {
              if (userData.email === i.email) {
                return (
        <tr>
          
          <td style={{color:"white",textAlign:"center"}}>{i.contribution_type}</td>
          <td>
                      {i.status === "Approved" ? (
                        <h5 style={{color:"white",textAlign:"center"}}>{i.community_points}</h5>
                      ) : i.status === "Rejected" ? (
                        <h5 style={{color:"white",textAlign:"center"}}>Rejected</h5>
                      ) : (
                        <h5 style={{color:"white",textAlign:"center"}}>Pending</h5>
                    
                      )}
                    </td>
          <td style={{color:"white",textAlign:"center"}}>{i.date}</td>
          
        </tr>
       
                )}
      }
      )
    }
        
        
      </tbody>
    </Table>
         </div>
       <br /><br /><br />
        <Footer />
        </div>
    )
}


export default TotalContributionPoints;

