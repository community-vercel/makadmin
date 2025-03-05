import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const TeamTables = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
console.log(tableData)
  // Fetch Data from API
  useEffect(() => {
    const getdata=(()=>{      fetch("http://127.0.0.1:8000/api/team-members/")
      .then(async response => {
        const data=await response.json()
      

        setTableData(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  });
   getdata()
  }, []);

  const handleEditClick = (id) => {
    // Navigate to the update page with the service area ID
    navigate(`/updateteam/${id}`);
  };

  // Delete Function
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/team-members/${id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted service area from the state
          setTableData((prevData) => prevData.filter((item) => item.id !== id));
        } else {
          console.error("Failed to delete service area");
        }
      })
      .catch((error) => console.error("Error deleting data:", error));
  };


  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h5">Team Members</CardTitle>
            <Button color="primary" onClick={() => navigate('/addteam')}>
              Add Team Member
            </Button>
          </div>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Description</th>
                <th>Pic</th>

                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>{tdata.name}</td>
                  <td>{tdata.role}</td>
                  <td>{tdata.bio}</td>


                  <td><img
                  src={tdata.photo}
                 width={90}
                 height={90}
                  style={{objectFit:"contain"}}
                  
                  /></td>


                  <td>
                    <span 
                      className={`p-2 rounded-circle d-inline-block ms-3 ${
                        tdata.status === "pending" ? "bg-danger" : 
                        tdata.status === "holt" ? "bg-warning" : "bg-success"
                      }`}>
                    </span>
                  </td>
                  <td>
                  <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => handleEditClick(tdata.id)}
              >
                <i className="bi bi-pencil"></i> Edit
              </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(tdata.id)}>
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>             
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TeamTables;