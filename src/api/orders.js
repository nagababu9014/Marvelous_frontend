import api from "./axios";

export const getMyOrders = () => {
  return api.get("orders/");
};

export const getOrderTracking = (orderId) => {
  return api.get(`orders/track/${orderId}/`);
};

