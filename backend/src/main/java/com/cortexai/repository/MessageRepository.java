package com.cortexai.repository;

import com.cortexai.model.Conversation;
import com.cortexai.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationOrderByCreatedAtAsc(Conversation conversation);
    List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId);
}
