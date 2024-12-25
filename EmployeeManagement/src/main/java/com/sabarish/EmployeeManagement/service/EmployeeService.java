package com.sabarish.EmployeeManagement.service;

import com.sabarish.EmployeeManagement.model.Employee;
import com.sabarish.EmployeeManagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository repo;

    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    public Employee getEmployeeById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Employee addEmployee(Employee emp) {
        return repo.save(emp);
    }

    public Employee updateEmployee(int id, Employee emp) {
        return repo.save(emp);
    }

    public void deleteEmployee(int id) {
        repo.deleteById(id);
    }
}
