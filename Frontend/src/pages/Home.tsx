import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto text-center">
      <h2 className="font-semibold text-xl mb-5">Yoklama Sistemine Hoşgeldiniz</h2>
      <Link to="/attendance" className="p-2 bg-red-100 rounded-md ">
        Yoklama Sitemine Git
      </Link>
    </div>
  );
}
