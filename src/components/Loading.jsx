import { Ring } from "@uiball/loaders";
import "../styles/Loading.css";

export default function Loading() {
  return (
    <div className="loading-screen">
      <Ring color="#ED1B24" />
    </div>
  );
}
