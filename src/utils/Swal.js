import Swal from 'sweetalert2'
import 'animate.css';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top', //'top-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

// export const ThankYouAnimate = Swal.fire({
//   title: 'Gracias por su compra. <br>Te esperamos pronto!!!',
//   showClass: {
//     popup: 'animate__animated animate__fadeInDown'
//   },
//   hideClass: {
//     popup: 'animate__animated animate__fadeOutUp'
//   }
// })
