import React, { useState, useEffect, useRef } from 'react';
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

const AddTest= () => {
    const { id } = useParams(); // Get the ID from URL params
    const navigate = useNavigate();
    const [serviceAreaData, setServiceAreaData] = useState({});


    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
    // Fetch the service area data for the update
    useEffect(() => {
        const fetchServiceArea = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/testimonials/${id}/`);
                const data = await response.json();
                setServiceAreaData(data);
                setKeywords(data.meta_keywords ? data.meta_keywords.split(', ') : []);
            } catch (error) {
                console.error('Error fetching service area:', error);
            }
        };

        fetchServiceArea();
    }, [id]);


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
        formData.append('meta_name', e.target.metaName.value);
        formData.append('meta_description', e.target.metaDescription.value);
        formData.append('client_name', e.target.client_name.value);
        formData.append('feedback', e.target.feedback.value);
        formData.append('meta_keywords', keywords.join(','));
        formData.append('date',e.target.date.value );
    

     
        try {
                

            const response =!serviceAreaData?.id? await fetch(`http://127.0.0.1:8000/api/testimonials/`, {
                method: 'POST',  // Use PUT method to update
                body: formData,  // Attach formData
            }):await fetch(`http://127.0.0.1:8000/api/testimonials/${id}/`, {
                method: 'PUT',  // Use PUT method to update
                body: formData,  // Attach formData
            });

            const responseData = await response.json();
            console.log('Response:', responseData);
            navigate(`/test`); // Redirect to the updated service area page
        } catch (error) {
            console.error('Error updating service area:', error);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="bdate-bottom p-3 mb-0 text-center font-weight-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg hover:scale-105 transform transition-all duration-300">
                  {!serviceAreaData?.id?"Add Testimonal":"Update Testimonal"}      
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                          
                            <FormGroup>
                                <Label for="client_name">Client Name</Label>
                                <Input id="client_name" name="client_name" placeholder="Enter client_name" type="text" defaultValue={serviceAreaData?.client_name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="feedback">Feedback</Label>
                                <Input id="feedback" name="feedback" placeholder="Enter feedback" type="text" defaultValue={serviceAreaData?.feedback} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="date">Date</Label>
                                <Input id="date" name="date" placeholder="Enter date" type="date" defaultValue={serviceAreaData?.date} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="metaName">Meta Name</Label>
                                <Input id="metaName" name="metaName" placeholder="Enter Meta Name" type="text" defaultValue={serviceAreaData?.meta_name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="metaDescription">Meta Description</Label>
                                <Input id="metaDescription" name="metaDescription" placeholder="Enter Meta Description" type="text" defaultValue={serviceAreaData?.meta_description} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="keywords">Keywords</Label>
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
                                        {keywords?.map((keyword, index) => (
                                            <li key={index} className="flex items-center bg-blue-100 text-sm px-3 py-1 rounded-full transition-all hover:bg-blue-200">
                                                <span className="text-blue-700">{keyword}</span>
                                                <button type="button" className="ml-2 text-red-600 hover:text-red-800 transition-colors" onClick={() => handleRemoveKeyword(index)}>&times;</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FormGroup>
                            
                        
                         
                        
                            <Button color="primary" type="submit" className="w-full max-w-full mt-3 block" style={{ width: '100%' }}>
                            {!serviceAreaData?.id?"Add ":"Update "}      

                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AddTest;