package com.autopartshub.user;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;

import javax.security.auth.PrivateCredentialPermission;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.dao.AddressDao;
import com.backend.dao.UserDao;
import com.backend.model.Address;
import com.backend.model.User;



@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
@SpringJUnitConfig
@Import(TestSecurityConfig.class)
class UserTest {

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserDao userRepo;
    
    @Autowired
    private AddressDao addRepo;

    @BeforeEach
    void setUp() {
        // Clean up the database before each test
        userRepo.deleteAll();
    }

    @Test
    void testUserRepository() {
        assertNotNull(userRepo);
    }

   // @Test
//    void testSaveUser() {
//        List<User> users = List.of(
//            new User(1,"Mahendra", "Kolhe", "mkolhe23@gmail.com", encoder.encode("Mahikolhe23"), "7350458073", "ADMIN"),
//            new User(2,"Sujay", "Mathane", "sujaymathane96@gmail.com", encoder.encode("Sujay123"), "8237510542", "ADMIN")
//        );

        // Save users to the database
       // userRepo.saveAll(users);

        // Fetch users from the database
     //   List<User> savedUsers = userRepo.findAll();

        // Assert that the users have been saved and retrieved correctly
       // assertNotNull(savedUsers);
       // assertEquals(2, savedUsers.size()); // Assuming you've saved 2 users
    //}

    @Test
    void testFindByEmailId() {
        // Save a user with a specific email
    	Address add=new Address(1,"City","admincity",1234);
    	addRepo.save(add);
        User user = new User(1,"ADMIN", "rootAdmin", "admin@gmail.com", encoder.encode("123456789"), "1234567890", "Admin",add);
        userRepo.save(user);

        // Retrieve the user by email
        User retrievedUser = userRepo.findByEmailId("admin@gmail.com");

        // Assert that the retrieved user matches the saved user
        assertNotNull(retrievedUser);
        assertEquals("ADMIN", retrievedUser.getFirstName());
        assertEquals("rootAdmin", retrievedUser.getLastName());
        assertEquals("Admin", retrievedUser.getRole());
    }

    @Test
    void testFindByEmailIdNotFound() {
        // Attempt to retrieve a non-existing user by email
        User retrievedUser = userRepo.findByEmailId("nonexistent@example.com");

        // Assert that the retrieved user is null
        assertNull(retrievedUser);
    }
}