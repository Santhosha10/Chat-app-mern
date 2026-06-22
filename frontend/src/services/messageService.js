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
