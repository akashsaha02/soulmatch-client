export const DIVISIONS = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];

export const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const occupationLabel = (occupation) =>
    typeof occupation === "string" ? occupation : occupation?.label || occupation?.value || "";
