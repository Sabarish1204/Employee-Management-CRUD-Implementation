import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import 'bootstrap/dist/css/bootstrap.min.css';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class ViewEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }
    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            this.setState({employee: res.data});
        });
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"><u>Details Of the Employee</u></h3>
                    <div className="card-body">
                        {[
                            { label: "First Name", value: this.state.employee.first_name },
                            { label: "Last Name", value: this.state.employee.last_name },
                            { label: "Designation", value: this.state.employee.designation },
                            { label: "Email ID", value: this.state.employee.email },
                            { label: "Salary", value: this.state.employee.salary },
                            { label: "Join Date", value: this.state.employee.joinDate },
                        ].map((field, index) => (
                            <div key={index} className="row field">
                                <label>{field.label}:</label>
                                <div className="value">{field.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(ViewEmployeeComponent);