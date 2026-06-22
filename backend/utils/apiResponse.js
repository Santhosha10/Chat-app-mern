export const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

export const sendServerError = (res, context, error) => {
  console.error(`[${context}]`, error);
  return sendError(res, 500, "Internal server error");
};
