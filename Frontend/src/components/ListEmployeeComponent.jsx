import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee=this.editEmployee.bind(this);
        this.deleteEmployee=this.deleteEmployee.bind(this);
        this.viewEmployee=this.viewEmployee.bind(this);
    }

    viewEmployee(id){
        window.location.href=`/view-employee/${id}`;
    }

    deleteEmployee(id){
         EmployeeService.deleteEmployee(id).then((res) => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
         });
    }

    editEmployee(id){
        window.location.href=`/update-employee/${id}`;
    }
    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees: res.data});
        })
    }

    addEmployee(){
        window.location.href='/add-employee/_add';
    }

    render() {
        return (
            <div>
                <h2 className="text-center"><u>Employees List</u></h2>
                <br></br>
                <div className="row" style={{ marginBottom: '10px' }}>
                    <button className="btn btn-primary" onClick={this.addEmployee} style={{ marginLeft: 'auto', display: 'block' }}> Add Employee </button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th> Employee First Name</th>
                                <th> Employee Last Name</th>
                                <th> Employee Designation</th>
                                {/*<th> Employee Email Id</th>
                                <th> Employee Salary</th>
                                <th> Employee Join Date</th>*/}
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td> {employee.id} </td>
                                            <td> {employee.first_name} </td>
                                            <td> {employee.last_name} </td>
                                            <td> {employee.designation} </td>
                                            {/*<td> {employee.email} </td>
                                            <td> {employee.salary} </td>
                                            <td> {employee.joinDate} </td>*/}
                                            <td>
                                                <button  onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                                <button style={{margin: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                                <button style={{margin: "2px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default withRouter(ListEmployeeComponent);