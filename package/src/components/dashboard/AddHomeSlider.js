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

const AddHomeSlider = () => {
   const { id } = useParams(); // Get the ID from URL params
       const navigate = useNavigate();
       const [serviceAreaData, setServiceAreaData] = useState({});

       // Fetch the service area data for the update
       useEffect(() => {
           const fetchServiceArea = async () => {
               try {
                   const response = await fetch(`http://127.0.0.1:8000/api/banners/${id}/`);
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
        formData.append('link', e.target.link.value);
        formData.append('order', e.target.order.value);

        if (serviceAreaData.image==='' || image.length>0) {

            formData.append('image', image[0]); 
    
            }

    

        try {
            const response =!serviceAreaData?.id?  await fetch('http://127.0.0.1:8000/api/banners/', {
                method: 'POST',  // Specify the HTTP method
                body: formData,  // Attach formData correctly
            }):
            
            await fetch(`http://127.0.0.1:8000/api/banners/${id}/`, {
                method: 'PUT',  // Specify the HTTP method
                body: formData,  // Attach formData correctly
            });
        
            const responseData = await response.json(); // Convert response to JSON
            console.log('Response:', responseData);
            navigate(`/homeslider`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center font-weight-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg hover:scale-105 transform transition-all duration-300">
                       {!serviceAreaData.id?"Add Slider ":"Update Slider "} 
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                           
                            <FormGroup>
                                <Label for="areaName">Title</Label>
                                <Input id="title" name="title" placeholder="Enter Title" type="text" defaultValue={serviceAreaData?.title} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="areaName">Link</Label>
                                <Input id="link" name="link" placeholder="Enter Link" type="text" defaultValue={serviceAreaData?.link} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="areaName">Order</Label>
                                <Input id="order" name="order" placeholder="Enter Order" type="number" defaultValue={serviceAreaData?.order} />
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
                            {!serviceAreaData.id?"Add Slider ":"Update Slider "} 
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AddHomeSlider;