import Swal from "sweetalert2";

export const showSwal = (title, icon, text) => {
  Swal.fire({
    title: title,
    icon: icon,
    text: text,
  });
};
