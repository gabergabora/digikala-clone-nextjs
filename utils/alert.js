import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const alert = (icon, msg) =>
  MySwal.fire({
    position: "center",
    icon,
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });

export const confirmAlert = ({ title, text, icon, confirmButtonText }) =>
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: false,
    confirmButtonColor: "#3085d6",

    confirmButtonText,
  });

export const editInfo = (type, title, patchData, token, isError, error) =>
  Swal.fire({
    title,
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    confirmButtonText: "ثبت",
    showLoaderOnConfirm: true,
    preConfirm: (data) => {
      if (type === "mobile") {
        // if (String(mobile).length < 11 || String(mobile).length >= 12)
        if (data.length < 11 || data.length >= 12)
          return Swal.showValidationMessage(
            "لطفا شماره موبایل خود را بصورت کامل وارد کنید"
          );
        const mobile = Number(data);

        patchData({
          url: "/api/user",
          body: { mobile },
          token,
        });
      }

      if (type === "name") {
        const name = data;

        if (name.length < 3)
          return Swal.showValidationMessage(
            "نام و نام خانوادگی نمیتواند کمتر 3 حرف باشد"
          );
        patchData({
          url: "/api/user",
          body: { name },
          token,
        });
      }

      if (type === "address") {
        const address = data;

        patchData({
          url: "/api/user",
          body: { address },
          token,
        });
      }

      if (isError) Swal.showValidationMessage(error?.data.err);
    },
  });
export default alert;
