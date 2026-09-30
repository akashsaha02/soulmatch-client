import Swal from "sweetalert2";

// Themed confirmation dialog for destructive actions. Resolves to true when confirmed.
export const confirmAction = async ({
    title = "Are you sure?",
    text = "This action cannot be undone.",
    confirmText = "Yes, continue",
    icon = "warning",
} = {}) => {
    const result = await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: "Cancel",
        reverseButtons: true,
        confirmButtonColor: "#c42a5a",
        cancelButtonColor: "#8a7a83",
        customClass: {
            popup: "!rounded-3xl !font-sans",
            title: "!font-display !font-medium",
        },
    });
    return result.isConfirmed;
};
