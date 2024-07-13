package com.coderdot.services;

import com.coderdot.entities.Customer;
import com.coderdot.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@AllArgsConstructor
@Service
public class CustomerService implements ICustomer{
    private CustomerRepository customerRepository;
    @Override
    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {
        Optional<Customer> existingCustomer = customerRepository.findById(id);
        if (existingCustomer.isPresent()) {
            Customer cust = existingCustomer.get();
            cust.setName(customer.getName());
            cust.setPassword(customer.getPassword());
            cust.setEmail(customer.getEmail());
            return customerRepository.save(cust);
        } else {
            throw new RuntimeException("Customer not found");
        }
    }
}
