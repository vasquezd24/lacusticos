package com.dva.lacustico.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.dva.lacustico.web.rest.TestUtil;

public class DeliveryPlatformTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryPlatform.class);
        DeliveryPlatform deliveryPlatform1 = new DeliveryPlatform();
        deliveryPlatform1.setId(1L);
        DeliveryPlatform deliveryPlatform2 = new DeliveryPlatform();
        deliveryPlatform2.setId(deliveryPlatform1.getId());
        assertThat(deliveryPlatform1).isEqualTo(deliveryPlatform2);
        deliveryPlatform2.setId(2L);
        assertThat(deliveryPlatform1).isNotEqualTo(deliveryPlatform2);
        deliveryPlatform1.setId(null);
        assertThat(deliveryPlatform1).isNotEqualTo(deliveryPlatform2);
    }
}
