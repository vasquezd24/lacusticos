package com.dva.lacustico.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.dva.lacustico.web.rest.TestUtil;

public class EntrepreneurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entrepreneur.class);
        Entrepreneur entrepreneur1 = new Entrepreneur();
        entrepreneur1.setId(1L);
        Entrepreneur entrepreneur2 = new Entrepreneur();
        entrepreneur2.setId(entrepreneur1.getId());
        assertThat(entrepreneur1).isEqualTo(entrepreneur2);
        entrepreneur2.setId(2L);
        assertThat(entrepreneur1).isNotEqualTo(entrepreneur2);
        entrepreneur1.setId(null);
        assertThat(entrepreneur1).isNotEqualTo(entrepreneur2);
    }
}
