import flowerLogo from "@/assets/icons/flower-bouqet.png";

export default function SectionTitleHome({
  heading,
  subHeading,
}: {
  heading: string;
  subHeading: string;
}) {
  return (
    <div className="pt-10 pb-5 flex flex-col items-center">
      <p className="cinzel font-bold uppercase md:text-lg text-me-darkOrange">{subHeading}</p>
      <h2 className="text-3xl md:text-4xl font-bold playfair text-me-brown">{heading}</h2>
      <div className="mt-1 md:mt-2">
        <img src={flowerLogo.src} className="w-24 md:w-36" alt="" />
      </div>
    </div>
  );
}
