import { apiRequest } from "./httpService";

export const getMessagesByConversation = (conversationId) => {
  return apiRequest(`/api/messages/${conversationId}`);
};

export const sendMessageToConversation = (conversationId, message) => {
  return apiRequest(`/api/messages/send/${conversationId}`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
};

export const toggleMessageReaction = (messageId, emoji) => {
  return apiRequest(`/api/messages/${messageId}/reaction`, {
    method: "PATCH",
    body: JSON.stringify({ emoji }),
  });
};

export const editMessageById = (messageId, message) => {
  return apiRequest(`/api/messages/${messageId}`, {
    method: "PATCH",
    body: JSON.stringify({ message }),
  });
};

export const deleteMessageById = (messageId) => {
  return apiRequest(`/api/messages/${messageId}`, {
    method: "DELETE",
  });
};
