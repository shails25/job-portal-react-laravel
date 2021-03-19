import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Hero from '../component/Hero';
import axios from 'axios';
import JobCard from '../component/JobCard';
import { Col, Container, Row } from 'reactstrap';
import useLocalStorage from './../useLocalStorage';

function Landing() {
    const [jobs, setJobs] = useState([]);
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("user_type");
    const name = localStorage.getItem("name");
    const isLoggedIn = token != null && token != undefined && name != null && name != undefined
    // const [token, userType, name, isLoggedIn] = useLocalStorage();

    useEffect(() => {
        axios.get("/api/jobs").then(res => {
            setJobs(res.data);
        })
    }, [setJobs])


    const handleJobApply = (e, job_id) =>{
        const elem = e.target;
        $(elem).text("Applying..");
        elem.disabled = true;
        axios.post("/api/apply/"+job_id+"?api_token="+token)
        .then(res => $(elem).text("Applied").removeClass("btn-primary").addClass("btn-success"))
        .catch(err => {
            alert(err.response.data.message||err.response.data.error);
            err.response.data.error ? $(elem).text("Applied").removeClass("btn-primary").addClass("btn-success") : null;
        })
    }

    const job_card = jobs.map(j => <Col sm="6" className="mb-4">
        <JobCard 
        key={j.job_id} 
        title={j.title} 
        description={j.description} 
        skills={j.skills} 
        date={j.created_at}
        className="mt-4"
        apply={(e) => handleJobApply(e, j.job_id)}
        isLoggedIn={isLoggedIn} 
        userType={userType}/>
        </Col>);
    return (
        <>
        <Header isLoggedIn={isLoggedIn} userType={userType} name={name} token={token}/>
        <Hero />
        <Container>
            <Row>{job_card}</Row>
        </Container>
        <Footer />
        </>
        
    );
}

export default Landing; 