package com.sabarish.EmployeeManagement.controller;

import com.sabarish.EmployeeManagement.model.Employee;
import com.sabarish.EmployeeManagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    EmployeeService service;
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        return new ResponseEntity<List<Employee>>(service.getAllEmployees(), HttpStatus.OK);
    }
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable int id){
        Employee e=service.getEmployeeById(id);
        if(e!=null){
            return new ResponseEntity<Employee>(e,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping("/employees")
    public ResponseEntity<?>addEmployee(@RequestBody Employee emp){
        try {
            Employee e1 = service.addEmployee(emp);
            return new ResponseEntity<>(e1,HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable int id,@RequestBody Employee emp){
        Employee e1=service.getEmployeeById(id);
        if(e1!=null){
            e1=service.updateEmployee(id,emp);
            return new ResponseEntity<Employee>(e1,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Employee>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id){
        Employee emp=service.getEmployeeById(id);
        if(emp!=null){
            service.deleteEmployee(id);
            return new ResponseEntity<>("Deleted Successfully.",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Employee Not Found.",HttpStatus.NOT_FOUND);
    }
}
