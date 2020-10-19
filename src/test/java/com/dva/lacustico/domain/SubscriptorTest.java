package com.dva.lacustico.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.dva.lacustico.web.rest.TestUtil;

public class SubscriptorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subscriptor.class);
        Subscriptor subscriptor1 = new Subscriptor();
        subscriptor1.setId(1L);
        Subscriptor subscriptor2 = new Subscriptor();
        subscriptor2.setId(subscriptor1.getId());
        assertThat(subscriptor1).isEqualTo(subscriptor2);
        subscriptor2.setId(2L);
        assertThat(subscriptor1).isNotEqualTo(subscriptor2);
        subscriptor1.setId(null);
        assertThat(subscriptor1).isNotEqualTo(subscriptor2);
    }
}
