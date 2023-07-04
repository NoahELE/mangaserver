package com.noahele.mangaserver.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class EventPublisher {
    private final JmsTemplate jmsTemplate;

    @Autowired
    public EventPublisher(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    public void publish(Object message) {
        jmsTemplate.convertAndSend(message);
    }
}
