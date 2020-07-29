import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./MainLayout.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { getIsNavbarOpen } from "../../redux/app/app.selectors";
import { AppStateType } from "../../redux/root.reducer";
import { setIsNavbarOpen } from "../../redux/app/app.actions";

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = React.memo((props: IProps) => {
  const { children } = props;

  const dispatch = useDispatch();
  const isNavbarOpen = useSelector((state: AppStateType) =>
    getIsNavbarOpen(state)
  );

  useEffect(() => {
    dispatch(setIsNavbarOpen(false));
  }, [dispatch]);

  return (
    <div className={s.mainLayout}>
      <Header />
      <Navbar
        isOpen={isNavbarOpen}
        setIsOpen={(status: boolean) => dispatch(setIsNavbarOpen(status))}
      />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
});

export default MainLayout;
