import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}
class UpdateEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            first_name: '',
            last_name: '',
            email: '',
            designation: '',
            salary: '',
            joinDate: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeJoinDateHandler = this.changeJoinDateHandler.bind(this)
        this.updateEmployee = this.updateEmployee.bind(this);;
    }
    
    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({id: employee.id,first_name: employee.first_name,
                        last_name: employee.last_name, email: employee.email,
                        designation: employee.designation, salary: employee.salary,
                        joinDate: employee.joinDate
             })
        });
    }
    updateEmployee = (e) => {
        e.preventDefault();
    
        // Construct the employee object from the state
        let employee = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            designation: this.state.designation,
            salary: this.state.salary,
            joinDate: this.state.joinDate,
        };
    
        console.log('Employee to update:', employee);
    
        EmployeeService.updateEmployee(employee, this.state.id)
            .then((res) => {
                window.location.replace('/employees'); // Navigate back to the employees list
            })
            .catch((error) => {
                console.error('Error updating employee:', error);
            });
    };
    

    changeFirstNameHandler = (event) => {
        this.setState({first_name: event.target.value});
    }
    changeLastNameHandler = (event) => {
        this.setState({last_name: event.target.value});
    }
    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }
    changeDesignationHandler = (event) => {
        this.setState({designation: event.target.value});
    }
    changeSalaryHandler = (event) => {
        this.setState({salary: event.target.value});
    }
    changeJoinDateHandler = (event) => {
        this.setState({joinDate: event.target.value});
    }
    cancel(){
        window.location.replace('/employees');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3>Update Employee </h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name : </label>
                                        <input placeholder="First Name" name="first_name" className="form-control"
                                           value={this.state.first_name} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name : </label>
                                        <input placeholder="Last Name" name="last_name" className="form-control"
                                           value={this.state.last_name} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email ID : </label>
                                        <input placeholder="Email ID" name="email" className="form-control"
                                           value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Designation : </label>
                                        <input placeholder="Designation" name="designation" className="form-control"
                                           value={this.state.designation} onChange={this.changeDesignationHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Salary : </label>
                                        <input placeholder="Salary" name="salary" className="form-control"
                                           value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Join Date : </label>
                                        <input placeholder="Join Date" name="joinDate" className="form-control"
                                           value={this.state.joinDate} onChange={this.changeJoinDateHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>
                                    <Link to='/employees' className="btn btn-danger"  style={{marginLeft: "10px"}}>Cancel</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UpdateEmployeeComponent);