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

const AddAppproch = () => {
   const { id } = useParams(); // Get the ID from URL params
       const navigate = useNavigate();
       const [serviceAreaData, setServiceAreaData] = useState({});

       // Fetch the service area data for the update
       useEffect(() => {
           const fetchServiceArea = async () => {
               try {
                   const response = await fetch(`${process.env.REACT_APP_API_URL}approch/${id}/`);
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
        formData.append('content', e.target.sutitle.value);
   
        if (serviceAreaData.image==='' || image.length>0) {

            formData.append('image', image[0]); 
    
            }

    

        try {
            const response =!serviceAreaData?.id?  await fetch(`${process.env.REACT_APP_API_URL}approch/`, {
                method: 'POST',  // Specify the HTTP method
                body: formData,  // Attach formData correctly
            }):
            
            await fetch(`${process.env.REACT_APP_API_URL}approch/${id}/`, {
                method: 'PUT',  // Specify the HTTP method
                body: formData,  // Attach formData correctly
            });
        
            const responseData = await response.json(); // Convert response to JSON
            console.log('Response:', responseData);
            navigate(`/approch`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center font-weight-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg hover:scale-105 transform transition-all duration-300">
                       {!serviceAreaData.id?"Add Approch ":"Update Approch "} 
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                           
                            <FormGroup>
                                <Label for="areaName">Title</Label>
                                <Input id="title" name="title" placeholder="Enter Title" type="text" defaultValue={serviceAreaData?.title} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="areaName">Content</Label>
                                <Input id="sutitle" name="sutitle" placeholder="Enter Detail" type="text" defaultValue={serviceAreaData?.content} />
                            </FormGroup>
                          
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
                            
                            <Button color="primary" type="submit" className="w-full max-w-full mt-3 block" style={{ width: '100%' }}>
                            {!serviceAreaData.id?"Add Approch ":"Update Approch "} 
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AddAppproch;