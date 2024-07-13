package com.coderdot.controllers;

import com.coderdot.entities.Customer;
import com.coderdot.services.ICustomer;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class CustomerController {
    private ICustomer iCustomer;
    @PostMapping("/addCustomer")
    public Customer addCustomer(@RequestBody  Customer customer){
        return iCustomer.addCustomer(customer);
    }
    @PutMapping("/updateCustomer/{id}")
    public Customer updateCustomer(@PathVariable Long id,@RequestBody Customer customer) {
        customer.setId(id);
        return iCustomer.updateCustomer(id,customer);
    }
}
