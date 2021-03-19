import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { FormGroup, Label , Input ,Badge, Container, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form} from 'reactstrap';
import Footer from '../component/Footer';
import Header from '../component/Header';

const Dashboard = (props) =>{
    const [appliedJobs, setAppliedJobs] = useState([]);
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("user_type");
    const name = localStorage.getItem("name");
    const isLoggedIn = token != null && token != undefined && name != null && name != undefined

    if(!token){
        props.history.push("/login");
    }
    
    useEffect(() => {
        //fetch token
        const token = localStorage.getItem("token");

        if(token){
            if(userType == 'user'){
                loadUserData()
            }else{
                loadRecruiterData()
            }
            
        }else{
            props.history.push("/");
        }
    }, [setAppliedJobs])

    const loadRecruiterData = () =>{
        axios.get("/api/recruiterJobs?api_token="+token)
        .then(res => setAppliedJobs(res.data))
        .catch(err => console.log(err.response))
    }

    const loadUserData = () =>{
        axios.get("/api/userJobs?api_token="+token)
        .then(res => setAppliedJobs(res.data))
        .catch(err => console.log(err.response))
    }

    const tr = appliedJobs.map(job => (
        <tr key={job.job_id}>
            <td>{job.job_id}</td>
            <td>{job.title}</td>
            <td>{job.description}</td>
            <td>{job.location}</td>
            <td><Badge color="warning">{job.status}</Badge></td>
        </tr>
    ));

   const [newjobdata, setnewjobdata] = useState({
       title: "",
       description: "",
       skills: "",
       location: ""
   })

   const submitHandler = (e) =>{
        e.preventDefault();
        const elem = e.target;
        $(elem).text("Posting")
        axios.post("/api/job?api_token="+token, newjobdata)
        .then(res => {
            alert("Job posted Successfully");
            toggle();
            setnewjobdata({
                title: "",
                description: "",
                skills: "",
                location: ""
            })
            loadRecruiterData();
            $(elem).text("Create Job")
        })
        .catch(err => console.log(err.response));

        
        // console.log(data);
    }

    const inputHandler = (event, elem) => {
        console.log(event.target.value, );
        const value = event.target.value;
        const data = {
            ...newjobdata,
            [elem] : value
        }

        setnewjobdata(data);
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    return (
        <>
            <Header isLoggedIn={isLoggedIn} userType={userType} name={name} token={token}/>
            
            <Container>
                <div>
                    
                    <Modal isOpen={modal} toggle={toggle} className="">
                        <ModalHeader toggle={toggle} close={closeBtn}>Modal title</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Title</Label>
                                    <Input type="text" name="title" id="exampleEmail" placeholder="Enter title" value={newjobdata?.title} onChange={(e) => inputHandler(e, "title")}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Description</Label>
                                    <Input type="text" name="description" id="examplePassword" placeholder="Enter Description" value={newjobdata?.description} onChange={(e) => inputHandler(e, "description")}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Skills</Label>
                                    <Input type="text" name="skills" id="examplePassword" placeholder="enter skills" value={newjobdata?.skills} onChange={(e) => inputHandler(e, "skills")}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Location</Label>
                                    <Input type="text" name="location" id="examplePassword" placeholder="enter location" value={newjobdata?.location} onChange={(e) => inputHandler(e, "location")}/>
                                </FormGroup>
                                <hr />
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={submitHandler}>Create Job</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <h2>{userType == 'recruiter' ? <><span>All Jobs: </span><Button color="primary" size="sm" onClick={toggle}>Create Job</Button> </>: "Applied Jobs"}</h2>
                <Table bordered striped hover responsive>
                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appliedJobs.length == 0 ? 
                        <tr>
                            <td colSpan="5">No Data Found</td>
                        </tr>  : tr}
                    </tbody>
                </Table>
            </Container>
            <Footer/>
        </>
    )
};

export default withRouter(Dashboard);