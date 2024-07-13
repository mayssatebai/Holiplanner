package com.coderdot.services;

import com.coderdot.entities.Customer;

public interface ICustomer {
    public Customer addCustomer( Customer customer);
    public Customer updateCustomer(Long id, Customer customer);
}
