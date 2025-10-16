import ElementBox from "@/ui/elementBox";
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <div>
      <main className=" flex items-center justify-center p-4 h-screen font-mono  sm:p-0">
       <ElementBox />
       <ToastContainer />
      </main>
    </div>
  );
}
