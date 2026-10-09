import { formatPrice, toBengaliNumber, getUnitLabel } from "@/lib/utils";

export default function Home() {
  return (
    <div className="p-10">
      <p>Price: {formatPrice(1850)}</p>
      <p>Number: {toBengaliNumber(2026)}</p>
      <p>Unit: {getUnitLabel("kg")}</p>
    </div>
  );
}