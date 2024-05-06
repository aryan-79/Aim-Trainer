import NavBar from "@/components/navbar";
import Provider from "@/components/provider";
import "@/globals.css";
export const metadata = {
  title: "Aim Trainer",
  desc: "Practice your aim",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <NavBar />
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
