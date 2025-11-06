import Image from "next/image";
import img from '@/public/pokeball_icon.svg'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <Image className="animate-spin rounded-full h-8 w-8 border-b-2" alt="Loading..." src={img} />
    </div>
  );
}