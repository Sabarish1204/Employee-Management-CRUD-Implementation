import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/employees";

class EmployeeService{

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL,employee);
    }
    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL+'/'+employeeId);
    }
    updateEmployee(employee,id){
        return axios.put(`http://localhost:8080/api/employees/${id}`, employee);
    }
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL+'/'+id);
    }
}

export default new EmployeeService()