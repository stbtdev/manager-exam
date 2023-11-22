import { useEffect, useState } from 'react';
import logo from './logo.svg';
import { db } from './api/firebase-config';
import { collection, getDocs, addDoc, updateDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import Modal from 'react-modal';
import React from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newPosition, setNewPosition] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [newGmail, setNewGmail] = useState("");
  Modal.setAppElement(document.getElementById('root'));
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  const [employeeDetail, setEmployeeDetail] = useState({
    name: "",
    age: 0,
    gmail: "",
    position: "",
    Department: "",
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [employees, setEmployees] = useState([]);
  const employeeCollectionRef = collection(db, "employees");
  useEffect(() => {
    const getEmployee = async () => {
      const data = await getDocs(employeeCollectionRef);
      setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };
    getEmployee();
  }, []);

  const createEmployee = async () => {
    await addDoc(employeeCollectionRef, { name: newName, age: newAge, gmail: newGmail, position: newPosition, Department: newDepartment })
    window.location.reload()
  }

  const updateEmployee = async () => {
    var id = sessionStorage.getItem("id");
    const userDoc = doc(db, "employees", id)
    await updateDoc(userDoc, { name: newName, age: newAge, gmail: newGmail, position: newPosition, Department: newDepartment });
    window.location.reload();
  }

  const getDetal = async (id) => {
    sessionStorage.setItem("id", id);
    const employeeDoc = doc(db, "employees", id);
    id = id;
    const employeeSnapshot = await getDoc(employeeDoc);

    if (employeeSnapshot.exists()) {
      setNewAge(employeeSnapshot.data().age);
      setNewName(employeeSnapshot.data().name);
      setNewDepartment(employeeSnapshot.data().Department);
      setNewPosition(employeeSnapshot.data().position);
      setNewGmail(employeeSnapshot.data().gmail);
    } else {
      console.log("Document does not exist");
      // Handle the case where the document doesn't exist
    }
  }

  function openModalUpdate(id) {
    setIsOpen1(true);
    getDetal(id);
  }

  function closeModalUpdate() {
    setIsOpen1(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateEmployee();
  };
  
  const deleteEmployee = async (id) => {
    const userDoc = doc(db, "employees", id);
    await deleteDoc(userDoc);
    window.location.reload();
  }
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\nbody {\n\tcolor: #566787;\n\tbackground: #f5f5f5;\n\tfont-family: \'Varela Round\', sans-serif;\n\tfont-size: 13px;\n}\n.table-responsive {\n    margin: 30px 0;\n}\n.table-wrapper {\n\tbackground: #fff;\n\tpadding: 20px 25px;\n\tborder-radius: 3px;\n\tmin-width: 1000px;\n\tbox-shadow: 0 1px 1px rgba(0,0,0,.05);\n}\n.table-title {        \n\tpadding-bottom: 15px;\n\tbackground: #435d7d;\n\tcolor: #fff;\n\tpadding: 16px 30px;\n\tmin-width: 100%;\n\tmargin: -20px -25px 10px;\n\tborder-radius: 3px 3px 0 0;\n}\n.table-title h2 {\n\tmargin: 5px 0 0;\n\tfont-size: 24px;\n}\n.table-title .btn-group {\n\tfloat: right;\n}\n.table-title .btn {\n\tcolor: #fff;\n\tfloat: right;\n\tfont-size: 13px;\n\tborder: none;\n\tmin-width: 50px;\n\tborder-radius: 2px;\n\tborder: none;\n\toutline: none !important;\n\tmargin-left: 10px;\n}\n.table-title .btn i {\n\tfloat: left;\n\tfont-size: 21px;\n\tmargin-right: 5px;\n}\n.table-title .btn span {\n\tfloat: left;\n\tmargin-top: 2px;\n}\ntable.table tr th, table.table tr td {\n\tborder-color: #e9e9e9;\n\tpadding: 12px 15px;\n\tvertical-align: middle;\n}\ntable.table tr th:first-child {\n\twidth: 60px;\n}\ntable.table tr th:last-child {\n\twidth: 100px;\n}\ntable.table-striped tbody tr:nth-of-type(odd) {\n\tbackground-color: #fcfcfc;\n}\ntable.table-striped.table-hover tbody tr:hover {\n\tbackground: #f5f5f5;\n}\ntable.table th i {\n\tfont-size: 13px;\n\tmargin: 0 5px;\n\tcursor: pointer;\n}\t\ntable.table td:last-child i {\n\topacity: 0.9;\n\tfont-size: 22px;\n\tmargin: 0 5px;\n}\ntable.table td a {\n\tfont-weight: bold;\n\tcolor: #566787;\n\tdisplay: inline-block;\n\ttext-decoration: none;\n\toutline: none !important;\n}\ntable.table td a:hover {\n\tcolor: #2196F3;\n}\ntable.table td a.edit {\n\tcolor: #FFC107;\n}\ntable.table td a.delete {\n\tcolor: #F44336;\n}\ntable.table td i {\n\tfont-size: 19px;\n}\ntable.table .avatar {\n\tborder-radius: 50%;\n\tvertical-align: middle;\n\tmargin-right: 10px;\n}\n.pagination {\n\tfloat: right;\n\tmargin: 0 0 5px;\n}\n.pagination li a {\n\tborder: none;\n\tfont-size: 13px;\n\tmin-width: 30px;\n\tmin-height: 30px;\n\tcolor: #999;\n\tmargin: 0 2px;\n\tline-height: 30px;\n\tborder-radius: 2px !important;\n\ttext-align: center;\n\tpadding: 0 6px;\n}\n.pagination li a:hover {\n\tcolor: #666;\n}\t\n.pagination li.active a, .pagination li.active a.page-link {\n\tbackground: #03A9F4;\n}\n.pagination li.active a:hover {        \n\tbackground: #0397d6;\n}\n.pagination li.disabled i {\n\tcolor: #ccc;\n}\n.pagination li i {\n\tfont-size: 16px;\n\tpadding-top: 6px\n}\n.hint-text {\n\tfloat: left;\n\tmargin-top: 10px;\n\tfont-size: 13px;\n}    \n/* Custom checkbox */\n.custom-checkbox {\n\tposition: relative;\n}\n.custom-checkbox input[type="checkbox"] {    \n\topacity: 0;\n\tposition: absolute;\n\tmargin: 5px 0 0 3px;\n\tz-index: 9;\n}\n.custom-checkbox label:before{\n\twidth: 18px;\n\theight: 18px;\n}\n.custom-checkbox label:before {\n\tcontent: \'\';\n\tmargin-right: 10px;\n\tdisplay: inline-block;\n\tvertical-align: text-top;\n\tbackground: white;\n\tborder: 1px solid #bbb;\n\tborder-radius: 2px;\n\tbox-sizing: border-box;\n\tz-index: 2;\n}\n.custom-checkbox input[type="checkbox"]:checked + label:after {\n\tcontent: \'\';\n\tposition: absolute;\n\tleft: 6px;\n\ttop: 3px;\n\twidth: 6px;\n\theight: 11px;\n\tborder: solid #000;\n\tborder-width: 0 3px 3px 0;\n\ttransform: inherit;\n\tz-index: 3;\n\ttransform: rotateZ(45deg);\n}\n.custom-checkbox input[type="checkbox"]:checked + label:before {\n\tborder-color: #03A9F4;\n\tbackground: #03A9F4;\n}\n.custom-checkbox input[type="checkbox"]:checked + label:after {\n\tborder-color: #fff;\n}\n.custom-checkbox input[type="checkbox"]:disabled + label:before {\n\tcolor: #b8b8b8;\n\tcursor: auto;\n\tbox-shadow: none;\n\tbackground: #ddd;\n}\n/* Modal styles */\n.modal .modal-dialog {\n\tmax-width: 400px;\n}\n.modal .modal-header, .modal .modal-body, .modal .modal-footer {\n\tpadding: 20px 30px;\n}\n.modal .modal-content {\n\tborder-radius: 3px;\n\tfont-size: 14px;\n}\n.modal .modal-footer {\n\tbackground: #ecf0f1;\n\tborder-radius: 0 0 3px 3px;\n}\n.modal .modal-title {\n\tdisplay: inline-block;\n}\n.modal .form-control {\n\tborder-radius: 2px;\n\tbox-shadow: none;\n\tborder-color: #dddddd;\n}\n.modal textarea.form-control {\n\tresize: vertical;\n}\n.modal .btn {\n\tborder-radius: 2px;\n\tmin-width: 150px;\n}\t\n.modal form label {\n\tfont-weight: normal;\n}\t\n'
        }}
      />
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Manage <b>Employees</b>
                  </h2>
                </div>
                <div className="col-sm-6" >
                  <a
                    href="#addEmployeeModal"
                    className="btn btn-success"
                    data-toggle="modal" onClick={openModal}
                  >
                    <i className="material-icons"></i>{" "}
                    <span>Add New Employee</span>
                  </a>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <form>
                      <div className="modal-header">
                        <h4 className="modal-title">Edit Employee</h4>
                        <button onClick={closeModal}
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-hidden="true"
                        >
                          ×
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>Name</label>
                          <input type="text" className="form-control" required="" onChange={(event) => { setNewName(event.target.value) }} />
                        </div>
                        <div className="form-group">
                          <label>Age</label>
                          <input type="number" className="form-control" required="" onChange={(event) => { setNewAge(event.target.value) }} />
                        </div>
                        <div className="form-group">
                          <label>Gmail</label>
                          <input
                            className="form-control" type="text"
                            required="" onChange={(event) => { setNewGmail(event.target.value) }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Position</label>
                          <input type="text" className="form-control" required="" onChange={(event) => { setNewPosition(event.target.value) }} />
                        </div>
                        <div className="form-group">
                          <label>Department</label>
                          <input type="text" className="form-control" required="" onChange={(event) => { setNewDepartment(event.target.value) }} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <input
                          type="button"
                          className="btn btn-default"
                          defaultValue="Cancel" onClick={closeModal}
                        />
                        <input type="submit" className="btn btn-info" defaultValue="Save" onClick={createEmployee} />
                      </div>
                    </form>
                  </Modal>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gmail</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => {
                  return <>
                    <tr key={e.id}>
                      <td>
                        #
                      </td>
                      <td>{e.name}</td>
                      <td>{e.age}</td>
                      <td>{e.gmail}</td>
                      <td>{e.position}</td>
                      <td>{e.Department}</td>
                      <td>
                        <a onClick={() => openModalUpdate(e.id)}
                          href="#editEmployeeModal"
                          className="edit"
                          data-toggle="modal"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Edit"
                          >
                            
                          </i>
                        </a>
                        <a onClick={() => deleteEmployee(e.id)}
                          href="#deleteEmployeeModal"
                          className="delete"
                          data-toggle="modal"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Delete"
                          >
                            
                          </i>
                        </a>
                      </td>
                    </tr>
                  </>
                })}
              </tbody>
            </table>
            {/* <div className="clearfix">
              <div className="hint-text">
                Showing <b>5</b> out of <b>25</b> entries
              </div>
              <ul className="pagination">
                <li className="page-item disabled">
                  <a href="#">Previous</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    2
                  </a>
                </li>
                <li className="page-item active">
                  <a href="#" className="page-link">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    Next
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      {/* Update model */}
      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModalUpdate}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Edit Employee</h4>
            <button onClick={closeModalUpdate}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Name</label>
              <input type="text"
                value={newName || ""}
                className="form-control" required="" onChange={(event) => { setNewName(event.target.value) }} />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" className="form-control"
                value={newAge || ""} required="" onChange={(event) => { setNewAge(event.target.value) }} />
            </div>
            <div className="form-group">
              <label>Gmail</label>
              <input
                className="form-control" type="text"
                value={newGmail || ""}
                required="" onChange={(event) => { setNewGmail(event.target.value) }}
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input type="text" className="form-control"
                value={newPosition || ""} onChange={(event) => { setNewPosition(event.target.value) }} />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input type="text"
                value={newDepartment || ""} className="form-control" required="" onChange={(event) => { setNewDepartment(event.target.value) }} />
            </div>
          </div>
          <div className="modal-footer">
            <input
              type="button"
              className="btn btn-default"
              defaultValue="Cancel" onClick={closeModal}
            />
            <input type="submit" className="btn btn-info" defaultValue="Save" />
          </div>
        </form>
      </Modal>
      {/* Delete Modal HTML */}
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">Delete Employee</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete these Records?</p>
                <p className="text-warning">
                  <small>This action cannot be undone.</small>
                </p>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Cancel"
                />
                <input
                  type="submit"
                  className="btn btn-danger"
                  defaultValue="Delete"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
