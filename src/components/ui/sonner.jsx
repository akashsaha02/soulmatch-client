import { Toaster as Sonner } from "sonner"

const Toaster = (props) => {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "font-sans rounded-2xl shadow-lift",
        },
      }}
      {...props} />
  );
}

export { Toaster }
