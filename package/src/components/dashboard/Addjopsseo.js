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

const AddSeo = () => {
   const { id } = useParams(); // Get the ID from URL params
       const navigate = useNavigate();
       const [serviceAreaData, setServiceAreaData] = useState({});

       // Fetch the service area data for the update
       useEffect(() => {
           const fetchServiceArea = async () => {
               try {
                   const response = await fetch(`${process.env.REACT_APP_API_URL}service-categories/${id}/`);
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
        formData.append('name', e.target.name.value);
        formData.append('title', e.target.title.value);
        formData.append('sutitle', e.target.sutitle.value);
        formData.append('meta_name', e.target.metaName.value);
        formData.append('meta_description', e.target.metaDescription.value);
        formData.append('meta_keywords', keywords.join(', '));
        

    

        try {
            const response =!serviceAreaData?.id?  await fetch(`${process.env.REACT_APP_API_URL}service-categories/`, {
                method: 'POST',  // Specify the HTTP method
                body: formData,  // Attach formData correctly
            }):
            
            await fetch(`${process.env.REACT_APP_API_URL}service-categories/${id}/`, {
                method: 'PUT',  // Specify the HTTP method
                body: formData,  // Attach formData correctly
            });
        
            const responseData = await response.json(); // Convert response to JSON
            console.log('Response:', responseData);
            navigate(`/services`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center font-weight-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg hover:scale-105 transform transition-all duration-300">
                       {!serviceAreaData.id?"Add  Seo ":"Update Seo "} 
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                    <Col md={6}>
                                                          <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" name="name" placeholder="Enter Name" type="text" defaultValue={serviceAreaData.name} />
                            </FormGroup>

                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="areaName">Title</Label>
                                <Input id="title" name="title" placeholder="Enter Title" type="text" defaultValue={serviceAreaData.title} />
                            </FormGroup>
                            </Col>  
                            </Row>
                            <Row>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="areaName">Sub Title</Label>
                                <Input id="sutitle" name="sutitle" placeholder="Enter Detail" type="text" defaultValue={serviceAreaData.sutitle} />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="metaName">Meta Name</Label>
                                <Input id="metaName" name="metaName" placeholder="Enter Meta Name" type="text" defaultValue={serviceAreaData.meta_name} />
                            </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="metaDescription">Meta Description</Label>
                                <Input id="metaDescription" name="metaDescription" placeholder="Enter Meta Description" type="text" defaultValue={serviceAreaData.meta_description} />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                           
                            </Col>
                            </Row>
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
                                        {keywords.map((keyword, index) => (
                                            <li key={index} className="flex items-center bg-blue-100 text-sm px-3 py-1 rounded-full transition-all hover:bg-blue-200">
                                                <span className="text-blue-700">{keyword}</span>
                                                <button type="button" className="ml-2 text-red-600 hover:text-red-800 transition-colors" onClick={() => handleRemoveKeyword(index)}>
                                                    &times;
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FormGroup>
 
                           
                            <Button color="primary" type="submit" className="w-full max-w-full mt-3 block" style={{ width: '100%' }}>
                            {!serviceAreaData.id?"Add  Seo ":"Update  Seo "} 
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AddSeo;