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

const AddCertificate= () => {
    const { id } = useParams(); // Get the ID from URL params
    const navigate = useNavigate();
    const [serviceAreaData, setServiceAreaData] = useState({});
    const [image, setImage] = useState([]);


    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
   
        const handleImageChange = (e) => {
            const files = e.target.files;
            setImage(files);
        };
    // Fetch the service area data for the update
    useEffect(() => {
        const fetchServiceArea = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}certifications/${id}/`);
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
        formData.append('name', e.target.name.value);
        formData.append('description', e.target.description.value);
        formData.append('meta_keywords', keywords.join(','));
        formData.append('obtained_date',e.target.obtained_date.value );

        if (serviceAreaData.logo==='' || image.length>0) {

        formData.append('logo', image[0]); 

        }
     
        try {
                

            const response =!serviceAreaData?.id? await fetch(`${process.env.REACT_APP_API_URL}certifications/`, {
                method: 'POST',  // Use PUT method to upobtained_date
                body: formData,  // Attach formData
            }):await fetch(`${process.env.REACT_APP_API_URL}certifications/${id}/`, {
                method: 'PUT',  // Use PUT method to upobtained_date
                body: formData,  // Attach formData
            });

            const responseData = await response.json();
            console.log('Response:', responseData);
            navigate(`/certificate`); // Redirect to the upobtained_dated service area page
        } catch (error) {
            console.error('Error updating service area:', error);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="bdate-bottom p-3 mb-0 text-center font-weight-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg hover:scale-105 transform transition-all duration-300">
                  {!serviceAreaData?.id?"Add Certificate":"Update Certificate"}      
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                          
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" name="name" placeholder="Enter name" type="text" defaultValue={serviceAreaData?.name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input id="description" name="description" placeholder="Enter description" type="text" defaultValue={serviceAreaData?.description} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="obtained_date">Obtained Date</Label>
                                <Input id="obtained_date" name="obtained_date" placeholder="Enter obtained_date" type="date" defaultValue={serviceAreaData?.obtained_date} />
                            </FormGroup>
                            <FormGroup>
                            <FormGroup>
        <Label for="exampleFile">Upload Logo</Label>
        <Input id="exampleFile" name="file" type="file" onChange={handleImageChange} />
    </FormGroup>
    {serviceAreaData &&serviceAreaData.logo?
                                    <img
                                    src={serviceAreaData.logo}
                                    />
                                    :''
                                }
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

export default AddCertificate;