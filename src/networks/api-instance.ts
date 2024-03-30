import { signOut } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// invalidate  global response while error 401
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return Swal.fire({
        title: "Sesi Anda telah Berakhir!",
        text: "Anda wajib login kembali!",
        timer: 1300,
        timerProgressBar: true,
        showConfirmButton: false,
        icon: "error",
      }).then(() => {
        return signOut();
      });
    }
    return Promise.reject(error);
  }
);

export { apiInstance };
