import { Roboto } from "next/font/google";
import StatTable from "@/components/stattable";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const Profile = () => {
  return (
    <div className="w-10/12 mx-auto mt-24">
      <div className="w-full mt-12 mx-auto">
        <StatTable />
      </div>
    </div>
  );
};

export default Profile;
