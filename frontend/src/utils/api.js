export const parseApiResponse = async (res) => {
  let data = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok || data?.error) {
    throw new Error(data?.error || "Request failed. Please try again.");
  }

  return data;
};
