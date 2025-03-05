import React, { useState,useEffect, useRef } from 'react';
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import { Editor } from '@tinymce/tinymce-react';
import { useParams, useNavigate } from "react-router-dom";

const Addjops = () => {
   const { id } = useParams(); // Get the ID from URL params
       const navigate = useNavigate();
       const [serviceAreaData, setServiceAreaData] = useState({});

       // Fetch the service area data for the update
       useEffect(() => {
           const fetchServiceArea = async () => {
               try {
                   const response = await fetch(`${process.env.REACT_APP_API_URL}job-vacancies/${id}/`);
                   const data = await response.json();
                   setServiceAreaData(data);
                   setKeywords(data.meta_keywords ? data.meta_keywords.split(', ') : []);
               } catch (error) {
                   console.error('Error fetching service area:', error);
               }
           };
   
           fetchServiceArea();
       }, [id]);
       
   
    const [image, setImage] = useState([]);

    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
    const editorRef = useRef(null);
    const editorRef2 = useRef(null);
    const editorRef3 = useRef(null);

    
    const handleImageChange = (e) => {
        const files = e.target.files;
        setImage(files);
    };

    const handleAddKeyword = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (keywordInput && !keywords.includes(keywordInput)) {
                setKeywords([...keywords, keywordInput]);
                setKeywordInput("");
            }
        }
    };

    const handleKeywordChange = (e) => {
        setKeywordInput(e.target.value);
    };

    const handleRemoveKeyword = (index) => {
        const newKeywords = [...keywords];
        newKeywords.splice(index, 1);
        setKeywords(newKeywords);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', e.target.title.value);
        formData.append('location', e.target.location.value);
        formData.append('description', e.target.description.value);
        formData.append('posted_date', e.target.posted_date.value);
        formData.append('application_deadline', e.target.application_deadline.value);
        formData.append('meta_name', e.target.metaName.value);
        formData.append('meta_description', e.target.metaDescription.value);
        formData.append('meta_keywords', keywords.join(', '));
        
        if (serviceAreaData.image==='' || image.length>0) {

            formData.append('image', image[0]); 
    
            }

    

        try {
            const response =!serviceAreaData?.id?  await fetch(`${process.env.REACT_APP_API_URL}job-vacancies/`, {
                method: 'POST',  // Specify the HTTP method
                body: formData,  // Attach formData correctly
            }):
            
            await fetch(`${process.env.REACT_APP_API_URL}job-vacancies/${id}/`, {
                method: 'PUT',  // Specify the HTTP method
                body: formData,  // Attach formData correctly
            });
        
            const responseData = await response.json(); // Convert response to JSON
            console.log('Response:', responseData);
            navigate(`/jobs`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center font-weight-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg hover:scale-105 transform transition-all duration-300">
                       {!serviceAreaData.id?"Add jobs ":"Update jobs "} 
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                        <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" name="title" placeholder="Enter Title" type="text" defaultValue={serviceAreaData?.title} />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="areaName">Description</Label>
                                <Input id="description" name="description" placeholder="Enter Description" type="text" defaultValue={serviceAreaData?.description} />
                            </FormGroup>
                            </Col>
                            
                            <Col md={6}>
                            <FormGroup>
                                <Label for="areaName">Location</Label>
                                <Input id="location" name="location" placeholder="Enter Location" type="text" defaultValue={serviceAreaData?.location} />
                            </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="areaName">Enter Date</Label>
                                <Input id="date" name="posted_date" placeholder="Enter Date" type="date" defaultValue={serviceAreaData?.posted_date} />
                            </FormGroup>
                            </Col>
                            
                            <Col md={6}>
                            <FormGroup>
                                <Label for="areaName">Application Deadline</Label>
                                <Input id="sutitle" name="application_deadline" placeholder="Enter Deadline" type="date" defaultValue={serviceAreaData?. application_deadline} />
                            </FormGroup>
                            </Col>
                            </Row>
                          
                            <FormGroup>
                                <Label for="exampleFile">Upload banner image</Label>
                                <Input id="exampleFile" name="file" type="file" onChange={handleImageChange} />
                            </FormGroup>
                            <FormGroup>
                                {serviceAreaData &&serviceAreaData.image?
                                    <img
                                    src={serviceAreaData.image}
                                    />
                                    :''
                                }

                                </FormGroup>
                                <Row>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="metaName">Home Page Meta Name</Label>
                                      <Input id="metaName" name="metaName" placeholder="Enter Meta Name" type="text" defaultValue={serviceAreaData?.meta_name} />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="metaDescription">Home Page Meta Description</Label>
                                      <Input id="metaDescription" name="metaDescription" placeholder="Enter Meta Description" type="text" defaultValue={serviceAreaData?.meta_description} />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                                            <FormGroup>
                                                                <Label for="keywords"> Home Page Keywords</Label>
                                                                <Input
                                                                    id="keywords"
                                                                    name="keywords"
                                                                    placeholder="Enter Keywords and press enter"
                                                                    type="text"
                                                                    value={keywordInput}
                                                                    onChange={handleKeywordChange}
                                                                    onKeyDown={handleAddKeyword}
                                                                />
                                                                <div className="mt-3">
                                                                    <ul className="flex flex-wrap gap-2">
                                                                        {keywords.map((keyword, index) => (
                                                                            <li key={index} className="flex items-center bg-blue-100 text-sm px-3 py-1 rounded-full transition-all hover:bg-blue-200">
                                                                                <span className="text-blue-700">{keyword}</span>
                                                                                <button type="button" className="ml-2 text-red-600 hover:text-red-800 transition-colors" onClick={() => handleRemoveKeyword(index)}>&times;</button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </FormGroup>
                            
                            <Button color="primary" type="submit" className="w-full max-w-full mt-3 block" style={{ width: '100%' }}>
                            {!serviceAreaData.id?"Add jobs ":"Update jobs "} 
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default Addjops;