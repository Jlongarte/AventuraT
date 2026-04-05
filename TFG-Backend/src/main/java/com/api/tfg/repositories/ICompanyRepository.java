package com.api.tfg.repositories;

import com.api.tfg.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICompanyRepository extends JpaRepository<Company, String> {

	boolean existsByCompanyName(String companyName);

	boolean existsByCif(String cif);

	boolean existsByPhone(String phone);

	boolean existsByIban(String iban);
}
