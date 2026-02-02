package com.belleileperfumee.belle_ile_parfumee;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled("Désactivé en CI - nécessite une base de données PostgreSQL")
class BelleIleParfumeeApplicationTests {

	@Test
	void contextLoads() {
	}

}
